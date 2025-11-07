// Import modules
const User = require('../../models/user'); 

const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

// Load environment variables
dotenv.config();

const signup = async (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and Password are required' });
  }

  try {
    // 1️⃣ Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // 2️⃣ Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3️⃣ Create new user
    user = new User({
      email,
      password: hashedPassword
    });

    // 4️⃣ Save to DB
    await user.save();

    // 5️⃣ Generate JWT token
 
    // 6️⃣ Send cookie
 

    // 7️⃣ Respond success
    res.status(201).json({ message: 'User created successfully',
      status:200,
      data:user
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = signup;