import joi from 'joi';
import { JoiSchema } from '../interfaces';

export const createUser: JoiSchema = {
  body: joi.object().keys({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(8).required()
  })
};