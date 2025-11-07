const express = require('express');
const router = express.Router();
const User = require('../../models/user');

// POST /api/content/generate
const generateContent = async (req, res) => {
  const userId = req.user.id;
  const { prompt, contentType } = req.body;

  if (!prompt) return res.status(400).json({ message: 'Prompt is required' });

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (!user.onboardingCompleted)
      return res.status(400).json({ message: 'Complete onboarding first' });

    const fullPrompt = `
      You are a content creator for a company.
      Company Name: ${user.companyName}
      Industry: ${user.industry}
      Team Size: ${user.teamSize || 'N/A'}
      Brand Voice: ${user.brandVoice?.tone || ''}, ${user.brandVoice?.description || ''}
      Content Type: ${contentType || 'General'}
      Generate content in the brand's tone based on the user's prompt:
      ${prompt}
    `;

    // Node 18+ has native fetch
    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': process.env.GEMINI_API_KEY
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: fullPrompt }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    console.log('Gemini API response:', JSON.stringify(data, null, 2));

    if (!data.candidates || !data.candidates.length) {
      return res.status(500).json({ message: 'Failed to generate content', raw: data });
    }

    const generatedContent = data.candidates[0].content;

    res.status(200).json({
      status: 200,
      message: 'Content generated successfully',
      content: generatedContent
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = generateContent;