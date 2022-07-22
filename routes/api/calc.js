const { joiSchemaCalc } = require('../../models/user');
const {
  schemaSetProduct,
  schemaDeleteProduct,
  schemaDailyInfo,
} = require('../../models/calc');
const {
  validation,
  validateParams,
  catchWrapper,
  auth,
} = require('../../middlewares');
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
router.post('/', validation(joiSchemaCalc), catchWrapper(defaultCalculator));
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
  '/user/:date/:productId',
  auth,
  validateParams(schemaDeleteProduct),
  catchWrapper(deleteProduct)
);
router.get(
  '/user/:date',
  auth,
  validateParams(schemaDailyInfo),
  catchWrapper(viewDailyInfo)
);

module.exports = router;
