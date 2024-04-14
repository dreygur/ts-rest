import http from 'http';
import { Express } from 'express';

export default function (app: Express): http.Server {
  const server = http.createServer(app);
  return server;
}