// const { date } = require('joi');
const { Schema, model } = require('mongoose');
const Joi = require('joi').extend(require('@joi/date'));
Joi.objectId = require('joi-objectid')(Joi);

const calcSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'user is required'],
  },
  date: {
    type: Date,
    // .format('DD.MM.YYYY'),
    required: [true, 'date is required'],
  },
  products: {
    type: Array,
    title: {
      type: String,
    },
    weight: {
      type: Number,
    },
    calories: {
      type: Number,
    },
  },
  summary: {
    type: Array,
    dailyRate: {
      type: Number,
    },
    consumed: {
      type: Number,
    },
    left: {
      type: Number,
    },
    nOfNorm: {
      type: Number,
    },
  },
});

const schemaSetProduct = Joi.object({
  date: Joi.date().format('DD.MM.YYYY').utc().required(),
  productId: Joi.objectId().required(),
  productWeight: Joi.number().min(0).required(),
});
const schemaDeleteProduct = Joi.object({
  date: Joi.date().format('DD.MM.YYYY').utc().required(),
  productId: Joi.objectId().required(),
});
const schemaDailyInfo = Joi.object({
  date: Joi.date().format('DD.MM.YYYY').utc().required(),
});

const Calc = model('Calc', calcSchema);

module.exports = {
  Calc,
  schemaSetProduct,
  schemaDeleteProduct,
  schemaDailyInfo,
};
