import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import status from 'http-status';
import compression from 'compression';
import passport from 'passport';
import statusMonitor from 'express-status-monitor';

// Local imports
import router from './routes/v1';
import ApiError from './errors/ApiError';
import * as errors from './middlewares/errors';
import * as morgan from './utils/morgan';
import JWTStrategy from './config/passport';

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

// Logger
app.use(morgan.successHandler);
app.use(morgan.errorHandler);

// Status Monitor
app.use(statusMonitor({
  title: 'Status Dashboard',
  path: '/api/status',
}));

// JWT Authentication
app.use(passport.initialize());
// app.use(passport.session());
passport.use('jwt', JWTStrategy);

// Serve v1 routes
app.use('/api/v1', router);

// Custom 404
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new ApiError(status.NOT_FOUND, 'Not Found'));
});

// Convert Error to ApiError
app.use(errors.converter);

// Error Handler middleware
app.use(errors.handler);

export default app;