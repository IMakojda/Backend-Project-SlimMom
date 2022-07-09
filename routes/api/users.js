const express = require("express");
// const { users: ctrl } = require("../../controllers");
// const { validation, catchWrapper, auth, upload } = require("../../middlewares");
// const {
//   joiSchema,
//   joiSubscriptionSchema,
//   joiAvatarUrlSchema,
//   joiEmailSchema,
// } = require("../../models/user");

const router = express.Router();

// router.post("/signup", validation(joiSchema), catchWrapper(ctrl.signUp));
// router.post("/login", validation(joiSchema), catchWrapper(ctrl.login));
// router.get("/logout", auth, catchWrapper(ctrl.logout));
// router.get("/current", auth, catchWrapper(ctrl.getCurrent));
// router.get("/verify/:verificationToken", catchWrapper(ctrl.verifyEmail));
// router.post("/verify", validation(joiEmailSchema), catchWrapper(ctrl.retryVerifyEmail));
// router.patch("/", auth, validation(joiSubscriptionSchema), catchWrapper(ctrl.updateSubscription));
// router.patch(
//   "/avatars",
//   auth,
//   validation(joiAvatarUrlSchema),
//   upload.single("avatar"),
//   catchWrapper(ctrl.updateAvatar)
// );

module.exports = router;
