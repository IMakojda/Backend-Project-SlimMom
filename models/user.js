const { Schema, model } = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  avatarURL: {
    type: String,
    required: true,
  },
  height: {
    type: Number,
    default: null,
  },
  age: {
    type: Number,
    default: null,
  },
  currentWeight: {
    type: Number,
    default: null,
  },
  desiredWeight: {
    type: Number,
    default: null,
  },
  bloodType: {
    type: Number,
    enum: [1, 2, 3, 4],
    default: 1,
  },
  token: {
    type: String,
    default: null,
  },
  dailyRate: {
    type: Number,
    default: null,
  },
  notRecFood: {
    type: Array,
    title: {
      type: String,
    },
  },
});

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const joiSchemaSignUp = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string()
    .min(6)
    .max(50)
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'ua'] },
    })
    .required(),
  password: Joi.string().alphanum().min(8).max(100).required(),
  height: Joi.number().min(100).max(250).integer(),
  age: Joi.number().min(18).max(100).integer(),
  currentWeight: Joi.number().min(20).max(500),
  desiredWeight: Joi.number().min(20).max(500),
  bloodType: Joi.number().valid(1, 2, 3, 4),
});

const joiSchemaLogin = Joi.object({
  email: Joi.string()
    .min(6)
    .max(50)
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'ua'] },
    })
    .required(),
  password: Joi.string().alphanum().min(8).max(100).required(),
});

const joiSchemaCalc = Joi.object({
  height: Joi.number().min(100).max(250).integer().required(),
  age: Joi.number().min(18).max(100).integer().required(),
  currentWeight: Joi.number().min(20).max(500).required(),
  desiredWeight: Joi.number().min(20).max(500).required(),
  bloodType: Joi.number().valid(1, 2, 3, 4).required(),
});

const joiAvatarUrlSchema = Joi.object({
  avatarURL: Joi.string(),
});

const User = model('User', userSchema);

module.exports = {
  User,
  joiSchemaSignUp,
  joiSchemaLogin,
  joiSchemaCalc,
  joiAvatarUrlSchema,
};
