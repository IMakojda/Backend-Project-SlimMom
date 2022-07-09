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
  avatarURL: String,
  token: {
    type: String,
    default: null,
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, "Verify token is required"],
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
  subscription: Joi.string().valid("starter", "pro", "business"),
  avatarURL: Joi.string(),
});

const joiSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business"),
});

const joiAvatarUrlSchema = Joi.object({
  avatarURL: Joi.string(),
});

const joiEmailSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "ua"] },
    })
    .required(),
});

const User = model("User", userSchema);

module.exports = {
  User,
  joiSchema,
  joiSubscriptionSchema,
  joiAvatarUrlSchema,
  joiEmailSchema,
};
