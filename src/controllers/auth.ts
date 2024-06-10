import { autoInjectable } from "tsyringe";
import { Request, Response } from "express";
import AuthService from "../services/auth";
import httpStatus from "http-status";

@autoInjectable()
class AuthController {
  constructor(
    private auth: AuthService
  ) {}

  async register(req: Request, res: Response) {
    req.body.password = await this.auth.genPass(req.body.password);
    const user = await this.auth.create(req.body);
    return res.status(httpStatus.CREATED).send({ user });
  }
}

export default AuthController;