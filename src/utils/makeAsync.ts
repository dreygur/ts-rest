import { Request, Response, NextFunction, RequestHandler } from "express";

/**
 * Makes a request error catchable
 * @param fn Express Middleware
 * @returns Express Middleware
 */
export default function (fn: RequestHandler): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}