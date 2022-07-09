const express = require('express');
const {
  defaultCalculator,
  userCalculator,
} = require('../../controllers/calculator');
const router = express.Router();

router.get('/', defaultCalculator);

router.get('/:userId', userCalculator);

module.exports = router;
