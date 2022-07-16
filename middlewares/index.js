const { validation, validateParams } = require('./validation');
const catchWrapper = require('./catchWrapper');
const errorHandler = require('./errorHandler');
const auth = require('./auth');
const upload = require('./upload');

module.exports = {
  validation,
  validateParams,
  catchWrapper,
  errorHandler,
  auth,
  upload,
};
