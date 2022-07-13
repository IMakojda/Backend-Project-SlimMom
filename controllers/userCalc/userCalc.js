const { Calc } = require('../../models');
const { findProductById } = require('../products');
const checkBase = async (date, userId) => {
  const result = await Calc.find({ user: userId, date: date });
  if (result[0]) console.log('Is in Base');
  else console.log('Is not in Base');
  return result[0];
};

const setProduct = async (req, res, next) => {
  console.log('setProduct is used');
  try {
    const { productId, date, productWeight } = req.body;
    // const newDate = new Date(`${date}`);
    console.log(typeof date);
    const newDate = new Date(date);
    console.log('Date', date);
    console.log('newDate', newDate);
    // newDate = date;
    const userId = req.userId;
    const product = await findProductById(productId);
    console.log('product:', product);
    // const productBaseId = product._id;
    const calories = (product.calories / 100) * productWeight;

    const result = await checkBase(newDate, userId);
    console.log('result:', result);
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
        const calc = await Calc.findOneAndUpdate(
          { user: userId, date: newDate },
          { products: userProducts },
          { new: true }
        );
        res.json({ product: calc });
      } else {
        const calc = await Calc.findOneAndUpdate(
          { user: userId, date: newDate },
          { products: [...userProducts, newProduct] },
          { new: true }
        );
        res.json({ product: calc });
      }
    } else {
      const calc = await Calc.create({
        user: userId,
        date: newDate,
        products: [newProduct],
      });
      res.json({ res: calc });
    }
  } catch (e) {
    return e;
  }
};

const deleteProduct = async (req, res, next) => {
  console.log('deleteProduct is used');
  try {
    const { productId, date } = req.body;
    const userId = req.userId;
    const result = await checkBase(date, userId);
    console.log('result:', result);
    if (result) {
      const products = result.products;
      const newProducts = products.filter((id) => id !== productId);
      const calc = await Calc.findOneAndUpdate(
        { user: userId, date: date },
        { products: newProducts },
        { new: true }
      );
      res.json({ product: calc });
    }
  } catch (e) {
    return e;
  }
};

const viewDailyInfo = async (req, res, next) => {
  console.log('viewDailyInfo is used');
  try {
    const { date } = req.body;
    const userId = req.userId;
    const { dailyRate, notRecFood } = req.user;
    const result = await checkBase(date, userId);
    console.log('result:', result);
    if (result) {
      const products = result.products;
      let consumed;
      for (const product of products) {
        consumed += product.calories;
      }
      const summary = {
        dailyRate: dailyRate,
        consumed: consumed,
        left: dailyRate - consumed,
        nOfNorm: (consumed / dailyRate) * 100,
      };
      res.json({
        products: products,
        summary: summary,
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
