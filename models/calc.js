const Joi = require('joi');

const schemaCalc = Joi.object({
  height: Joi.number().integer().required(),
  age: Joi.number().integer().required(),
  currentWeight: Joi.number().required(),
  desiredWeight: Joi.number().required(),
  bloodType: Joi.number().integer().min(1).max(4).required(),
});

module.exports = {
  schemaCalc,
};
