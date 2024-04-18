const { resolve } = require('path');

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@app/(.*)$': resolve(__dirname, './src/$1'),
    '^@utils/(.*)$': resolve(__dirname, './src/utils/$1'),
    '^@models/(.*)$': resolve(__dirname, './src/models/$1'),
    '^@services/(.*)$': resolve(__dirname, './src/services/$1'),
    '^@middlewares/(.*)$': resolve(__dirname, './src/middlewares/$1'),
    '^@controllers/(.*)$': resolve(__dirname, './src/controllers/$1'),
    '^@validations/(.*)$': resolve(__dirname, './src/validations/$1'),
  },
};