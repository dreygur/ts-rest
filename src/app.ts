import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import status from 'http-status';
import compression from 'compression';

// Local imports
import router from '@app/routes';
import ApiError from '@app/errors/ApiError';
import * as errors from '@app/middlewares/errors';

const app = express();

// Load middlewares
// Set security HTTP headers
app.use(helmet());

// gZip Compression
app.use(compression());

// Enavle CORS
app.use(cors({ origin: '*' }));
app.options('*', cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve v1 routes
app.use('/api/v1', router);

// Custom 404
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new ApiError(status.NOT_FOUND, 'Not Found'));
});

// Convert Error to ApiError
app.use(errors.converter);

// Handle an Error
app.use(errors.handler);

export default app;