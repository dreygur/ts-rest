import { Request, Response } from "express";
import httpStatus from "http-status";
import makeAsync from "@app/utils/makeAsync";
import * as user from '@services/user';

export const register = makeAsync(async (req: Request, res: Response) => {
    const createdUser = await user.create(req.body);
    return res.status(httpStatus.CREATED).send(createdUser);
});