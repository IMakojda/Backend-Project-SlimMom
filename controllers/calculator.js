// ФОРМУЛА ДЛЯ РОЗРАХУНКУ ДЕННОЇ НОРМИ КАЛОРІЙ ЖІНКАМ
// 10 * вага + 6.25 * зріст - 5 * вік - 161 - 10 * (вага - бажана вага)
const { createError } = require('../helpers/errors');
const { updateUser } = require('./users');
const { findProducts } = require('./products');
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

const prohibited = (userData) => {
  const { bloodType } = userData;
  // console.log(findProducts);
  // const result = findProducts(`groupBloodNotAllowed`, `[${bloodType}]==true`);
  // const result = findProducts(`calories`, 623);
  const result = findProducts(`groupBloodNotAllowed`, `[${bloodType}]==true`);
  return result;
};

const defaultCalculator = async (req, res, next) => {
  prohibited(req.body);
  res.json({
    callory: calculation(req.body),
    // prohibited: prohibited(req.body),
  });
};

const userCalculator = async (req, res, next) => {
  const paramId = req.params.userId;
  const tokenId = req.userId;
  if (paramId !== tokenId) throw createError(400, `${paramId} is wrong id`);

  updateUser(paramId, req.body);
  res.json({
    result: calculation(req.body),
  });
  // todo edituser(userId,userData);
};

module.exports = {
  defaultCalculator,
  userCalculator,
};
