const express = require("express");
const { users: ctrl } = require("../../controllers");
const { validation, catchWrapper, auth } = require("../../middlewares");
const { joiSchemaSignUp, joiSchemaLogin } = require("../../models/user");

const router = express.Router();

router.post("/signup", validation(joiSchemaSignUp), catchWrapper(ctrl.signUp));
router.post("/login", validation(joiSchemaLogin), catchWrapper(ctrl.login));
router.get("/logout", auth, catchWrapper(ctrl.logout));
router.get("/current", auth, catchWrapper(ctrl.getCurrent));

module.exports = router;
