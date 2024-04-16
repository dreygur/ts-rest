import morgan from 'morgan';
import { Request, Response } from 'express';
import logger from '@app/utils/logger';

morgan.token('message', (req: Request, res: Response) => res.locals.errorMessage ?? '');

const format = () => (process.env.NODE_ENV === 'production' ? ':remote-addr - ' : '');
const successResponseFormat = `${format()}:method :url :status - :response-time ms`;
const errorResponseFormat = `${format()}:method :url :status - :response-time ms - message: :message`;

/**
 * Handle success response
 */
export const successHandler = morgan(successResponseFormat, {
  skip: (req: Request, res: Response) => res.statusCode >= 400,
  stream: { write: (message) => logger.info(message.trim()) },
});

/**
 * Handle Error response
 */
export const errorHandler = morgan(errorResponseFormat, {
  skip: (req: Request, res: Response) => res.statusCode < 400,
  stream: { write: (message) => logger.error(message.trim()) },
});