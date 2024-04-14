import methodNotAlloed from "@app/middlewares/methodNotAlloed";
import { Router, Request, Response, NextFunction } from "express";
import status from 'http-status';
import ApiError from "@app/errors/ApiError";

const router = Router();

router.get('/', (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'Hello World!'
  });
});

export default router;