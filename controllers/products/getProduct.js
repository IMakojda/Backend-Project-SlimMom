const { Product } = require('../../models');
const { NotFound, BadRequest } = require('http-errors');

const getProduct = async (req, res) => {
  const { product } = req.query;

  if (!product) {
    throw new BadRequest('Missing field of product');
  }

  const productsList = await Product.find({
    $or: [
      { 'title.ru': { $regex: product, $options: 'i' } },
      { 'title.ua': { $regex: product, $options: 'i' } },
    ],
  });

  if (!productsList.length) {
    throw new NotFound('Product not found');
  }

  res.json(productsList);
};

module.exports = getProduct;
