import request from 'supertest';
import app from '../src/app';
import { describe, test } from '@jest/globals';

describe('Test the root path', () => {
  test("It should response the GET method", () => {
    return request(app)
      .get("/")
      .expect(200);
  });
});