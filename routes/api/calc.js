const { joiSchemaCalc } = require('../../models/user');
const { validation, catchWrapper, auth } = require('../../middlewares');

const express = require('express');
const {
  defaultCalculator,
  userCalculator,
} = require('../../controllers/calculator');
const {
  setProduct,
  delProduct,
  viewInfo,
} = require('../../controllers/userCalc');
const router = express.Router();

router.get('/', validation(joiSchemaCalc), catchWrapper(defaultCalculator));

router.put(
  '/user',
  auth,
  validation(joiSchemaCalc),
  catchWrapper(userCalculator)
);
router.post(
  '/user',
  auth,
  // validation(joiSchemaCalc),
  catchWrapper(setProduct)
);

router.delete(
  '/user/:productId',
  auth,
  // validation(joiSchemaCalc),
  catchWrapper(delProduct)
);
router.get(
  '/user',
  auth,
  // validation(joiSchemaCalc),
  catchWrapper(viewInfo)
);

module.exports = router;
