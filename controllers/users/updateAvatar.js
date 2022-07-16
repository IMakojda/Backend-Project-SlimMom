const fs = require('fs/promises');
const path = require('path');
const Jimp = require('jimp');
const { Unauthorized } = require('http-errors');
const { User } = require('../../models');

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars');

const updateAvatar = async (req, res) => {
  const { _id: userId } = req.user;
  const { path: tempDir, originalname } = req.file;
  const avatarName = `${userId}_${originalname}`;

  try {
    const avatar = await Jimp.read(tempDir);
    await avatar.resize(250, 250).writeAsync(tempDir);

    const resultDir = path.join(avatarsDir, avatarName);
    await fs.rename(tempDir, resultDir);

    const avatarURL = path.join('avatars', avatarName);
    await User.findByIdAndUpdate(userId, { avatarURL });

    res.json({ avatarURL });
  } catch (error) {
    await fs.unlink(tempDir);
    throw new Unauthorized('Not authorized');
  }
};

module.exports = updateAvatar;
