const { Calc } = require('../../models');
const { findProductById } = require('../products');
const checkBase = async (date, userId) => {
  const result = await Calc.find({ user: userId, date: date });
  return result[0];
};

const calcSummary = (products, dailyRate) => {
  let consumed = 0;
  for (const product of products) {
    consumed += product.calories;
  }
  const summary = {
    dailyRate: dailyRate,
    consumed: consumed,
    left: dailyRate - consumed,
    nOfNorm: Math.round((consumed / dailyRate) * 100),
  };
  return summary;
};

const setProduct = async (req, res, next) => {
  try {
    const { dailyRate } = req.user;
    const { productId, date, productWeight } = req.body;
    const userId = req.userId;
    const query = { user: userId, date: date };
    const product = await findProductById(productId);
    const calories = (product.calories / 100) * productWeight;
    const result = await checkBase(date, userId);
    const newProduct = {
      id: product._id,
      title: product.title,
      weight: productWeight,
      calories: calories,
    };

    if (result) {
      const userProducts = result.products;
      const productIndex = userProducts.findIndex(
        (product) => product.id.toString() === productId
      );
      if (productIndex !== -1) {
        userProducts[productIndex].calories += calories;
        userProducts[productIndex].weight += productWeight;
        const summary = calcSummary(userProducts, dailyRate);
        await Calc.findOneAndUpdate(
          query,
          { products: userProducts, summary: summary },
          { new: true }
        );
      } else {
        const newProducts = [...userProducts, newProduct];
        const summary = calcSummary(newProducts, dailyRate);
        await Calc.findOneAndUpdate(
          query,
          { products: newProducts, summary: summary },
          { new: true }
        );
      }
    } else {
      const summary = calcSummary([newProduct], dailyRate);
      await Calc.create({
        ...query,
        products: [newProduct],
        summary: summary,
      });
    }
    const calc = await checkBase(date, userId);
    res.json({ result: calc });
  } catch (e) {
    return e;
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { dailyRate } = req.user;
    const { productId, date } = req.body;
    const userId = req.userId;
    const result = await checkBase(date, userId);
    if (result) {
      const products = result.products;
      const newProducts = products.filter(
        (product) => product.id.toString() !== productId
      );
      const summary = calcSummary(newProducts, dailyRate);
      const calc = await Calc.findOneAndUpdate(
        { user: userId, date: date },
        { products: newProducts, summary: summary },
        { new: true }
      );
      res.json({ result: calc });
    }
  } catch (e) {
    return e;
  }
};
const viewDailyInfo = async (req, res, next) => {
  try {
    const { date } = req.body;
    const userId = req.userId;
    const { notRecFood } = req.user;
    const result = await checkBase(date, userId);
    if (result) {
      res.json({
        result: result,
        notRecFood: notRecFood,
      });
    }
  } catch (e) {
    return e;
  }
};
module.exports = {
  setProduct,
  deleteProduct,
  viewDailyInfo,
};
