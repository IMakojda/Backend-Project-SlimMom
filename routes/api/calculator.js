const { joiSchemaCalc } = require('../../models/user');
const { validation, catchWrapper, auth } = require('../../middlewares');

const express = require('express');
const {
  defaultCalculator,
  userCalculator,
} = require('../../controllers/calculator');
const router = express.Router();

router.get('/', validation(joiSchemaCalc), catchWrapper(defaultCalculator));

router.put(
  '/:userId',
  auth,
  validation(joiSchemaCalc),
  catchWrapper(userCalculator)
);

module.exports = router;
