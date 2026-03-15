import { verifyJwtToken } from "../utils/jwt";
import { AuthUser } from "../types/user.type";
import { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";
import status from "http-status";

export async function auth(req: Request, res: Response, next: NextFunction) {
  try {
    const cookies = req.headers.authorization;
    if (!cookies) throw new Error();
    const accessToken = cookies;

    const decode = verifyJwtToken(
      accessToken as string,
      process.env.JWT_ACCESS_TOKEN_SECRET as string,
    ) as AuthUser & JwtPayload;

    if (!decode) throw new Error();

    const user = {
      id: decode.id,
      phone: decode.phone,
      name: decode.name,
      photo: decode.phone,
    };

    (req as Request & { user: AuthUser }).user = user;
    next();
  } catch (error) {
    next(new AppError(status.UNAUTHORIZED, "Unauthorized"));
  }
}
