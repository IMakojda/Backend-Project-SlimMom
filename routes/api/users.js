const express = require('express');
const { users: ctrl } = require('../../controllers');
const { validation, catchWrapper, auth, upload } = require('../../middlewares');
const {
  joiSchemaSignUp,
  joiSchemaLogin,
  joiAvatarUrlSchema,
} = require('../../models/user');

const router = express.Router();

router.post('/signup', validation(joiSchemaSignUp), catchWrapper(ctrl.signUp));
router.post('/login', validation(joiSchemaLogin), catchWrapper(ctrl.login));
router.get('/logout', auth, catchWrapper(ctrl.logout));
router.get('/current', auth, catchWrapper(ctrl.getCurrent));
router.patch(
  '/avatars',
  auth,
  validation(joiAvatarUrlSchema),
  upload.single('avatar'),
  catchWrapper(ctrl.updateAvatar)
);

module.exports = router;
