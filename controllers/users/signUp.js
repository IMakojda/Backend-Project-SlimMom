const { User } = require('../../models');
const { Conflict } = require('http-errors');

const signUp = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw new Conflict('Email in use');
  }

  const newUser = new User({ name, email });
  newUser.setPassword(password);
  await newUser.save();

  res.status(201).json({ user: { name, email } });
};

module.exports = signUp;
