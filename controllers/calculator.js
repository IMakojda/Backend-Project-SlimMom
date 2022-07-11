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

const prohibited = async (userData) => {
  const { bloodType } = userData;
  const options = { _id: 0, title: 1 };
  const limit = 10;
  const result = await findProducts(
    `groupBloodNotAllowed[${bloodType}]`,
    true,
    options,
    limit
  );
  return result;
};

const defaultCalculator = async (req, res, next) => {
  prohibited(req.body);
  res.json({
    callory: calculation(req.body),
    prohibited: await prohibited(req.body),
  });
};

const userCalculator = async (req, res, next) => {
  const paramId = req.params.userId;
  const tokenId = req.userId;
  if (paramId !== tokenId) throw createError(400, `${paramId} is wrong id`);

  updateUser(paramId, req.body);
  res.json({
    callory: calculation(req.body),
    prohibited: await prohibited(req.body),
  });
};

module.exports = {
  defaultCalculator,
  userCalculator,
};
