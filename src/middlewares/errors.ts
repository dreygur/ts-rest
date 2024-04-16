import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import ApiError from '@app/errors/ApiError';

/**
 * Error Convrter to be parsable by the error handler
 * @param err Error object
 * @param req Request object
 * @param res Response object
 * @param next Next function
 */
export function converter(err: ApiError, req: Request, res: Response, next: NextFunction) {
  let error = err;
  if (!(error instanceof ApiError)) {
    const status = err.status || httpStatus.BAD_REQUEST;
    const message = err.message || httpStatus[httpStatus.BAD_REQUEST];
    error = new ApiError(status, message, false, err.stack);
  }
  next(error);
}

/**
 * Error Handler
 * @param err Error object
 * @param req Request object
 * @param res Response object
 * @param next Next function
 */
export function handler(err: ApiError, req: Request, res: Response, next: NextFunction) {
  let { status, message } = err;
  if (process.env.NODE_ENV === 'production' && !err.operational) {
    status = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: status,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  };

  if (process.env.NODE_ENV === 'development') {
    console.error(err);
  }

  return res.status(status).send(response);
}