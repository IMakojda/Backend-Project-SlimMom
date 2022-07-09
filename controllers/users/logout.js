const { Unauthorized } = require("http-errors");
const { User } = require("../../models");

const logout = async (req, res) => {
  const { _id: userId } = req.user;
  const user = await User.findById(userId);

  if (!user) {
    throw new Unauthorized("Not authorized");
  }

  await User.findByIdAndUpdate(user._id, { token: null });

  res.status(204).json();
};

module.exports = logout;
