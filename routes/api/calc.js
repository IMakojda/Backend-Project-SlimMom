const { joiSchemaCalc } = require('../../models/user');
const {
  schemaSetProduct,
  schemaDeleteProduct,
  schemaDailyInfo,
} = require('../../models/calc');
const { validation, catchWrapper, auth } = require('../../middlewares');

const express = require('express');
const {
  defaultCalculator,
  userCalculator,
} = require('../../controllers/calculator');
const {
  setProduct,
  deleteProduct,
  viewDailyInfo,
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
  validation(schemaSetProduct),
  catchWrapper(setProduct)
);

router.delete(
  '/user/:productId',
  auth,
  validation(schemaDeleteProduct),
  catchWrapper(deleteProduct)
);
router.get(
  '/user',
  auth,
  validation(schemaDailyInfo),
  catchWrapper(viewDailyInfo)
);

module.exports = router;
