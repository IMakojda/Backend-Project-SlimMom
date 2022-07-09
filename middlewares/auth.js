const jwt = require("jsonwebtoken");
const { Unauthorized } = require("http-errors");
const { User } = require("../models");

const auth = async (req, res, next) => {
  const { authorization } = req.headers;
  const [tokenType, token] = authorization.split(" ");

  const SECRET_KEY = process.env.SECRET_KEY;

  try {
    if (tokenType !== "Bearer") {
      throw new Unauthorized("Not authorized");
    }

    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);

    if (!user || !user.token) {
      throw new Unauthorized("Not authorized");
    }

    req.user = user;
    next();
  } catch (error) {
    next(new Unauthorized("Not authorized"));
  }
};

module.exports = auth;
