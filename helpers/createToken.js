const jwt = require('jsonwebtoken');
const { User } = require('../models');

const createToken = async (user) => {
  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, process.env.SECRET_KEY);
  await User.findByIdAndUpdate(user._id, { token });

  return token;
};

module.exports = createToken;
