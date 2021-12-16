// ./server/helpers/error.js

export class ErrorHandler extends Error {
  statusCode: number;
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

export function handleError(err, res) {
  const { statusCode, message } = err;
  res.status(statusCode || 500).json({ status: 'error', statusCode, message });
}
