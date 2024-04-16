import {config} from 'dotenv';
config();

import createServer from '@app/server';
import app from '@app/app';
import database from '@app/db';
import dbInit from '@app/init';
import logger from '@app/utils/logger';

const server = createServer(app);
const PORT = process.env.PORT as string || 3000;

database.authenticate()
  .then(() => {
    logger.info('Connection to the database has been established successfully.');
    dbInit();

    // Initiate the application server
    server.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    logger.error('Unable to connect to the database:', err);
    process.exit(1);
  });

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
