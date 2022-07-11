const { Product } = require('../../models');

const findProducts = async (field, data, options, limit) => {
  try {
    const products = await Product.find({ [field]: data }, options).limit(
      limit
    );
    return products;
  } catch (e) {
    return e;
  }
};

module.exports = findProducts;
