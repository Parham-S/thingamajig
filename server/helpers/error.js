// ./server/helpers/error.js

class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

function handleError(err, res) {
  const { statusCode, message } = err;
  res.status(statusCode || 500).json({ status: 'error', statusCode, message });
}

module.exports = { ErrorHandler, handleError };