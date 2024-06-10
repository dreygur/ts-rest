import {config} from 'dotenv';
config();

import "reflect-metadata";
import createServer from './server';
import app from './app';
import database from './db';
import dbInit from './models';
import logger from './utils/logger';

const server = createServer(app);
const PORT = process.env.PORT as string || 3000;

// Handle Gracefull shutdown
const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
    });
  }
  database.close();
  process.exit(1);
};

const unexpectedErrorHandler = (error: Error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
    database.close();
  }
});

// Server Start
(async () => {
  try {
    // Require Database Connection
    await database.authenticate()
    logger.info('Connection to the database has been established successfully.');
    await dbInit();

    // Initiate the application server
    server.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  } catch(err) {
    logger.error('Unable to connect to the database:', err);
    process.exit(1);
  }
})();