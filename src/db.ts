import process from 'node:process';
import { Sequelize, Dialect } from 'sequelize';

// Environment variables
const username = process.env.DB_USERNAME as string;
const password = process.env.DB_PASSWD as string;
const database = process.env.DB_NAME as string;
const dialect = "mysql" as Dialect;
const host = process.env.DB_HOST as string;

// Sequelize Initialization
const sequelize = new Sequelize(database, username, password, {
  host, dialect, logging: false
});

export default sequelize;