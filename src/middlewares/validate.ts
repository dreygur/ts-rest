import joi from 'joi';
import httpStatus from 'http-status';
import { Request, Response, NextFunction, RequestHandler } from "express";
import pick from '@app/utils/cherryPick';
import ApiError from "@app/errors/ApiError";
import { JoiSchema } from '@app/interfaces';

export default function validate(schema: JoiSchema): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    const validSchema = pick(schema, ['params', 'query', 'body']);
    const object = pick(req, Object.keys(validSchema));
    const { value, error } = joi.compile(validSchema)
      .prefs({ errors: { label: 'key' }, abortEarly: false })
      .validate(object);
  
    if (error) {
      const errorMessage = error.details.map((details) => details.message).join(', ');
      return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
    }

    Object.assign(req, value);
    return next();
  };
}