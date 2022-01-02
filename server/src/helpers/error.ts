// ./server/helpers/error.ts

import  { Response } from 'express';

export class ErrorHandler extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

export function handleError(err: ErrorHandler, res: Response) {
  const { statusCode, message } = err;
  res.status(statusCode || 500).json({ status: 'error', statusCode, message });
}
