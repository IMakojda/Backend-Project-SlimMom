const { Schema, model } = require('mongoose');
// const Joi = require('joi');

const productSchema = new Schema({
  categories: {
    type: Array,
    required: [true, 'categories is required'],
  },
  weight: {
    type: Number,
    required: [true, 'weight is required'],
  },
  title: {
    type: Object,
    required: [true, 'title is required'],
  },
  calories: {
    type: Number,
    required: [true, 'calories is required'],
  },
  groupBloodNotAllowed: {
    type: Array,
    required: [true, 'groupBloodNotAllowed is required'],
  },
});

// const joiSchemaCalc = Joi.object({
//   height: Joi.number().min(100).max(250).integer().required(),
//   age: Joi.number().min(18).max(100).integer().required(),
//   currentWeight: Joi.number().min(20).max(500).required(),
//   desiredWeight: Joi.number().min(20).max(500).required(),
//   bloodType: Joi.number().valid(1, 2, 3, 4).required(),
// });

const Product = model('Product', productSchema);

module.exports = {
  Product,
  // joiSchemaCalc,
};
