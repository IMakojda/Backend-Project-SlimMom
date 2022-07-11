const getCurrent = async (req, res) => {
  const { name, email, height, age, currentWeight, desiredWeight, bloodType } =
    req.user;

  res.json({
    name,
    email,
    height,
    age,
    currentWeight,
    desiredWeight,
    bloodType,
  });
};

module.exports = getCurrent;
