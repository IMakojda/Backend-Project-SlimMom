const { BadRequest } = require('http-errors');

const validation = (schema) => {
  return (req, res, next) => {
    const validationResult = schema.validate(req.body);

    if (validationResult?.error) {
      next(new BadRequest(validationResult.error.message));
    }

    next();
  };
};

const validateParams = (schema) => {
  return (req, res, next) => {
    const validationResult = schema.validate(req.params);
    if (validationResult?.error) {
      next(new BadRequest(validationResult.error.message));
    }

    next();
  };
};

module.exports = { validation, validateParams };
