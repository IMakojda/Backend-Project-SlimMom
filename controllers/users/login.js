const { User } = require('../../models');
const { Unauthorized } = require('http-errors');
const createToken = require('../../helpers/createToken');

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const isValidPassword = user?.comparePassword(password);

  if (!user || !isValidPassword) {
    throw new Unauthorized('Email or password is wrong');
  }

  const token = await createToken(user);

  const {
    name,
    avatarURL,
    createdAt,
    height,
    age,
    currentWeight,
    desiredWeight,
    bloodType,
  } = user;

  res.json({
    token,
    user: {
      name,
      email,
      avatarURL,
      createdAt,
      height,
      age,
      currentWeight,
      desiredWeight,
      bloodType,
    },
  });
};

module.exports = login;
