const { User } = require("../../models");
const { Conflict } = require("http-errors");

const signUp = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw new Conflict("Email in use");
  }

  const newUser = new User({ email });
  newUser.setPassword(password);
  await newUser.save();

  res.status(201).json({ user: { email } });
};

module.exports = signUp;
