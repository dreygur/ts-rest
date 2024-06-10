import "reflect-metadata";
import request from "supertest";
import {config} from 'dotenv';
config();

import app from '../src/app';
import database from '../src/db';
jest.useFakeTimers()

describe("Authentication Routes", () => {
  beforeAll(async () => {
    await database.authenticate();
  });

  test("Register a user", async () => {
    const res = await request(app).post("/api/v1/auth/signup")
      .send({
        "firstName": "Rakib",
        "lastName": "Test",
        "email": "exo72smv@elatter.com",
        "password": "Abcd@12345"
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');
    expect(res.statusCode).toEqual(400);
  });

  afterAll(async () => {
    await database.close();
  });
});