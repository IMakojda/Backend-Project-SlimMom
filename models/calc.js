const Joi = require('joi');

const schemaCalc = Joi.object({
  height: Joi.number().min(100).max(250).integer().required(),
  age: Joi.number().min(18).max(100).integer().required(),
  currentWeight: Joi.number().min(20).max(500).required(),
  desiredWeight: Joi.number().min(20).max(500).required(),
  bloodType: Joi.number().integer().min(1).max(4).required(),
});

module.exports = {
  schemaCalc,
};
