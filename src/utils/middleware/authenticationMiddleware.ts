import { NextFunction, Request, Response } from "express";
import { Service, Inject } from "typedi";
import TokenService from "./TokenService";
import AppError from "../error//AppError";

@Service()
export class AuthenticationMiddleware {
  constructor(@Inject(() => TokenService) private tokenService: TokenService) {}

  private authenticate(req: Request, res: Response, next: NextFunction): void {
    const token = req.headers.authorization;
    try {
      const user = this.tokenService.verifyToken(token);
      req.user = user;
      next();
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.httpCode).send(error.toJSON());
      } else {
        const unexpectedError = new AppError(
          500,
          "UNEXPECTED_ERROR",
          error.message,
          "Authentication Middleware"
        );
        res.status(unexpectedError.httpCode).send(unexpectedError.toJSON());
      }
    }
  }
}
