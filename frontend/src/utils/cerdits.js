const User = require("../models/user");

const deductCredits = async (userId, amount) => {
  const user = await User.findById(userId);

  if (!user) throw new Error("User not found");
  if (user.monthlyCredits - user.creditsUsed < amount) {
    throw new Error("Insufficient credits");
  }

  user.creditsUsed += amount;
  await user.save();

  return user;
};

module.exports = deductCredits;
