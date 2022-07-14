const express = require('express');
const { products: ctrl } = require('../../controllers');
const { auth, catchWrapper } = require('../../middlewares');

const router = express.Router();

router.get('/', auth, catchWrapper(ctrl.getProduct));

module.exports = router;
