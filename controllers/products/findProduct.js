const { Product } = require('../../models');

const findProducts = async (field, data) => {
  try {
    console.log('field:', field);
    console.log('data:', data);
    const products = await Product.find({ [field]: data });
    console.log('products:', products);
    return products;
  } catch (e) {
    return e;
  }
};

module.exports = findProducts;
