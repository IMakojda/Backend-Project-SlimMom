const { Schema, model } = require('mongoose');
// const Joi = require('joi');

const calcSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'user is required'],
  },
  date: {
    type: Date,
    required: [true, 'date is required'],
  },
  products: {
    type: Array,
    title: {
      type: String,
      required: [true, 'title is required'],
    },
    weight: {
      type: Number,
      required: [true, 'weight is required'],
    },
    calories: {
      type: Number,
      required: [true, 'calories is required'],
    },
  },
});

// const joiSchemaCalc = Joi.object({
//   height: Joi.number().min(100).max(250).integer().required(),
//   age: Joi.number().min(18).max(100).integer().required(),
//   currentWeight: Joi.number().min(20).max(500).required(),
//   desiredWeight: Joi.number().min(20).max(500).required(),
//   bloodType: Joi.number().valid(1, 2, 3, 4).required(),
// });

const Calc = model('Calc', calcSchema);

module.exports = {
  Calc,
  // joiSchemaCalc,
};
