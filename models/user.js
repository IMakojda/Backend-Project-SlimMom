const { Schema, model } = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  height: {
    type: Number,
  },
  age: {
    type: Number,
  },
  current_weight: {
    type: Number,
  },
  desired_weight: {
    type: Number,
  },
  blood_type: {
    type: Number,
    enum: [1, 2, 3, 4],
  },
  token: {
    type: String,
    default: null,
  },
});

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const joiSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "ua"] },
    })
    .required(),
  password: Joi.string().required(),
  height: Joi.number(),
  age: Joi.number(),
  current_weight: Joi.number(),
  desired_weight: Joi.number(),
  blood_type: Joi.number().valid(1, 2, 3, 4),
});

const User = model("User", userSchema);

module.exports = {
  User,
  joiSchema,
};
