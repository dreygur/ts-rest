import { Request, Response } from "express";
import status from 'http-status';

export default function (req: Request, res: Response) {
  res.status(status.NOT_FOUND)
    .json({
      success: false,
      message: status[status.NOT_FOUND]
    });
}