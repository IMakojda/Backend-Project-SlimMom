const { cloudinary } = require('../../cloudinary/cloudinary');
const { InternalServerError } = require('http-errors');
const { User } = require('../../models');

const updateAvatar = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const fileStr = req.body.avatar;

    const uploadResp = await cloudinary.uploader.upload(fileStr, {
      upload_preset: 'dev_setups',
    });

    const avatarURL = uploadResp.url;
    await User.findByIdAndUpdate(userId, { avatarURL });

    res.json({ avatarURL });
  } catch (error) {
    throw new InternalServerError('Internal server error');
  }
};

module.exports = updateAvatar;
