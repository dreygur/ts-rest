import { Request, Response } from "express";
import status from 'http-status';

export default function (req: Request, res: Response) {
  return res.status(status.METHOD_NOT_ALLOWED)
    .json({
      success: false,
      message: status[status.METHOD_NOT_ALLOWED]
    });
}