const getCurrent = async (req, res) => {
  const {
    name,
    email,
    avatarURL,
    createdAt,
    height,
    age,
    currentWeight,
    desiredWeight,
    bloodType,
  } = req.user;

  res.json({
    name,
    email,
    avatarURL,
    createdAt,
    height,
    age,
    currentWeight,
    desiredWeight,
    bloodType,
  });
};

module.exports = getCurrent;
