const { User } = require("../../models");
const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const isValidPassword = user?.comparePassword(password);

  if (!user || !isValidPassword) {
    throw new Unauthorized("Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, process.env.SECRET_KEY);
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user: {
      email,
    },
  });
};

module.exports = login;
