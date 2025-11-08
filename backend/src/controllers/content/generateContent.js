const User = require('../../models/User'); // Updated path: go up two levels
const Job = require('../../models/Job');   // Updated path: go up two levels

/**
 * 🛎️ PART 1: THE "WAITER" (Waits for the AI to finish)
 * Handles the incoming request, creates a job ticket, and waits for completion.
 */
const generateContent = async (req, res) => {
  let jobId = null;
  try {
    const { prompt } = req.body;

    // 1. Authentication & Validation
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    if (!prompt) {
      return res.status(400).json({ message: 'Prompt is required' });
    }

    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    console.log(`[Log 1] User ${userId} requested content for: "${prompt.substring(0, 30)}..."`);

    // 2. Create the "Job Ticket" in Database
    const job = new Job({
      userId: userId,
      // Use user's preferred platforms or default to all four
      platforms: user.selectedPlatforms && user.selectedPlatforms.length > 0 
        ? user.selectedPlatforms 
        : ['email', 'blog', 'twitter', 'linkedin'],
      originalContent: prompt,
      status: 'processing'
    });
    await job.save();
    jobId = job._id;

    console.log(`[Log 2] Job ${jobId} created. Sending to AI Kitchen...`);

    // 3. Send to "Kitchen" and AWAIT it (so we don't send response until done)
    // In a larger app, you might not await this and instead use webhooks/polling.
    await processContentBackground(jobId, prompt, user);

    console.log(`[Log 3] Job ${jobId} finished processing. Fetching result...`);

    // 4. Fetch the completed job
    const finishedJob = await Job.findById(jobId);
    if (!finishedJob) {
      throw new Error('Job Disappeared from database after processing.');
    }

    // 5. Return success to client
    res.status(200).json({
      success: true,
      message: 'Content generated successfully!',
      job: finishedJob
    });

  } catch (error) {
    console.error(`[CATCH BLOCK] Error in generateContent for Job ${jobId}:`, error.message);

    // Attempt to fail the job in DB if it exists
    if (jobId) {
       await Job.findByIdAndUpdate(jobId, { 
         status: 'failed', 
         error: error.message 
       }).catch(e => console.error("Failed to update job status to failed:", e));
    }

    res.status(500).json({
      success: false,
      message: 'Content generation failed.',
      error: error.message
    });
  }
};

/**
 * 👨‍🍳 PART 2: THE "KITCHEN" (Interacts with AI APIs)
 * 1. Calls Gemini for text.
 * 2. Generates an Image URL based on the prompt.
 * 3. Updates the Job ticket.
 */
const processContentBackground = async (jobId, prompt, user) => {
  try {
    // --- A. PREPARE GEMINI PROMPT ---
    const fullPrompt = `
      You are an expert content marketing AI for a company named "${user.companyName || 'Our Company'}" in the "${user.industry || 'General'}" industry.
      Brand Tone: ${user.brandVoice || 'professional'}
      TASK: Generate marketing content based on this prompt: "${prompt}"
      OUTPUT REQUIREMENTS:
      You MUST return ONLY a raw JSON object. Do not include markdown formatting (like \`\`\`json ... \`\`\`).
      The JSON object must have exactly these keys: "twitter", "linkedin", "email", "blog".
      FORMAT:
      {
        "twitter": "Write a short, engaging tweet (max 280 chars) with hashtags.",
        "linkedin": "Write a professional LinkedIn post (3-5 sentences).",
        "email": { "subject": "Email Subject Line", "body": "Email Body Content" },
        "blog": "Write a one-paragraph blog post summary or intro."
      }
    `;

    // --- B. CALL GEMINI FOR TEXT ---
    console.log(`[Kitchen] Calling Gemini for Job ${jobId}...`);
    const textResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: fullPrompt }] }],
          generationConfig: { responseMimeType: "application/json" }
        })
      }
    );

    if (!textResponse.ok) {
      const errText = await textResponse.text();
      throw new Error(`Gemini API Failed: ${textResponse.status} - ${errText}`);
    }

    const textData = await textResponse.json();
    if (!textData.candidates || !textData.candidates[0].content) {
       throw new Error("Gemini returned an empty response.");
    }

    // Parse the JSON text from Gemini
    const rawText = textData.candidates[0].content.parts[0].text;
    const cleanedJsonText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
    let generatedContent = JSON.parse(cleanedJsonText);

    // --- C. GENERATE IMAGE BASED ON PROMPT ---
    // We use the user's prompt + industry to create a specific image URL.
    // Pollinations.ai generates a real image on-the-fly when this URL is loaded by the frontend.
    console.log(`[Kitchen] creating image URL for Job ${jobId}...`);
    
    const imagePrompt = `professional, modern marketing image for ${user.industry || 'business'} industry, related to: ${prompt}, vibrant colors, high quality, 4k, no text`;
    const encodedPrompt = encodeURIComponent(imagePrompt);
    const randomSeed = Math.floor(Math.random() * 9999); // Ensures fresh image if prompt is repeated
    
    // This URL *is* the image. No need to wait for it to generate here.
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?seed=${randomSeed}&width=1280&height=720&nologo=true&model=flux`;

    // Add image to content object
    generatedContent.imageUrl = imageUrl;

    // --- D. SAVE SUCCESS TO DB ---
    await Job.findByIdAndUpdate(jobId, {
      status: 'completed',
      generatedContent: generatedContent,
      completedAt: new Date()
    });

    console.log(`[Kitchen] Job ${jobId} completed successfully with Text + Image.`);

  } catch (error) {
    console.error(`[Kitchen FAILED] Job ${jobId} error:`, error.message);
    // Re-throw so the 'Waiter' knows it failed
    throw error;
  }
};

module.exports = {
  generateContent,
  // processContentBackground is internal, but we can export it if needed for testing
};