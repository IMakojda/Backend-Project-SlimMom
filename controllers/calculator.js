const { createError } = require('../helpers/errors');
const { schemaCalc } = require('../models/calc');
// ФОРМУЛА ДЛЯ РОЗРАХУНКУ ДЕННОЇ НОРМИ КАЛОРІЙ ЖІНКАМ
// 10 * вага + 6.25 * зріст - 5 * вік - 161 - 10 * (вага - бажана вага)
const calculation = (userData) => {
  const { height, age, currentWeight, desiredWeight } = userData;
  const result =
    10 * currentWeight +
    6.25 * height -
    5 * age -
    161 -
    10 * (currentWeight - desiredWeight);
  return result;
};

const defaultCalculator = async (req, res, next) => {
  try {
    const { userData } = req.body;
    if (!userData) throw createError(404, 'body Not found');
    const { error } = schemaCalc.validate(userData);
    if (error) {
      console.log(error);
      throw createError(400, error.message);
    } else res.json({ result: calculation(userData) });
  } catch (e) {
    next(e);
  }
};

const userCalculator = async (req, res, next) => {
  const { userId } = req.params;
  console.log('userId:', userId);
  res.json('feature not finished yet');
};

module.exports = {
  defaultCalculator,
  userCalculator,
};
