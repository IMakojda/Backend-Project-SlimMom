const createError = (status, message) => {
  const e = new Error();
  e.status = status;
  e.message = message;
  console.log(e.status, e.message);
  return e;
};
class ValidationError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}
module.exports = {
  createError,
  ValidationError,
};
