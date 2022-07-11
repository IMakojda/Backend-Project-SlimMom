const { User } = require('../../models');
const { Unauthorized } = require('http-errors');
const update = async (id, data) => {
  const user = await User.findById(id);

  if (!user) {
    throw new Unauthorized('Not authorized');
  }
  await User.findByIdAndUpdate(user._id, data);
  return data;
};

module.exports = update;
