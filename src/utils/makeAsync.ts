import { IRequestOptions } from "../interfaces";
import { Request, Response, NextFunction, RequestHandler } from "express";

/**
 * Makes a request error catchable
 * @param fn Express Middleware
 * @returns Express Middleware
 */
export default function (fn: RequestHandler, options?: IRequestOptions): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    req.options = options || {};
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}