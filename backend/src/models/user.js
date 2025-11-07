const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  companyName: { 
    type: String, 
    default: '' 
  },

  brandVoice: {
    tone: { 
      type: String, 
      enum: ['Professional', 'Friendly', 'Casual'],
      default: 'Professional'
    },
    description: { 
      type: String, 
      default: '' 
    }
  },

 
  selectedPlatforms: [{
    type: String,
    enum: ['twitter', 'linkedin', 'instagram', 'facebook', 'email', 'blog']
  }],

  // Basic usage tracking
  monthlyCredits: { 
    type: Number, 
    default: 100 
  },
  creditsUsed: { 
    type: Number, 
    default: 0 
  }
  ,
   onboardingCompleted: { 
    type: Boolean, 
    default: false 
  }

}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);