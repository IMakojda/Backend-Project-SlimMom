// const { date } = require('joi');
const { Calc } = require('../../models');
const { findProductById } = require('../products');
const checkBase = async (date, userId) => {
  return await Calc.find({ user: userId, date: date });
};

const setProduct = async (req, res, next) => {
  try {
    const { productId, date, productWeight } = req.body;
    const userId = req.userId;
    const product = await findProductById(productId);
    const calories = (product.calories / 100) * productWeight;
    const newProduct = {
      id: product._id,
      title: product.title,
      weight: productWeight,
      calories: calories,
    };
    console.log('newProduct', newProduct);
    const result = await checkBase(date, userId);
    console.log('result:', result);
    if (result[0]) {
      console.log('Is in Base');
      const calc = await Calc.findOneAndUpdate(
        { user: userId, date: date },
        { products: [...result[0].products, newProduct] },
        { new: true }
      );
      res.json({ product: calc });
    } else {
      console.log('Is not in Base');
      const calc = await Calc.create({
        user: userId,
        date: date,
        products: [newProduct],
      });
      res.json({ res: calc });
    }
  } catch (e) {
    return e;
  }
};

const delProduct = async (req, res, next) => {
  res.json({ message: 'delProduct is used' });
};

const viewInfo = async (req, res, next) => {
  res.json({ message: 'viewInfo is used' });
};
module.exports = {
  setProduct,
  delProduct,
  viewInfo,
};
