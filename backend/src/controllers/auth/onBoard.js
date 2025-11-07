const User = require('../../models/user'); 

const completeOnboarding = async (req, res) => {
  const { companyName, industry, brandTone, teamSize } = req.body;
  const userId = req.user.id;

  try {
    // Directly pass the object; Mongoose will handle the $set internally
    const updates = {
      companyName,
      industry,
      teamSize,
      brandVoice: brandTone,      // brandTone should match schema { tone, description }
      onboardingCompleted: true   // optional: if you have this field
    };

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updates,                    // no need for {$set: updates}
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'Onboarding completed successfully',
      status:200,
      user: updatedUser,
      error:null
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = completeOnboarding;