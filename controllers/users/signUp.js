const { User } = require('../../models');
const { Conflict } = require('http-errors');
const createToken = require('../../helpers/createToken');

const signUp = async (req, res) => {
  const {
    name,
    email,
    password,
    height = null,
    age = null,
    currentWeight = null,
    desiredWeight = null,
    bloodType = 1,
  } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw new Conflict('Email in use');
  }

  const newUser = new User({
    name,
    email,
    height,
    age,
    currentWeight,
    desiredWeight,
    bloodType,
  });
  newUser.setPassword(password);
  await newUser.save();

  const token = await createToken(newUser);

  res.status(201).json({
    token,
    user: {
      name,
      email,
      height,
      age,
      currentWeight,
      desiredWeight,
      bloodType,
    },
  });
};

module.exports = signUp;
