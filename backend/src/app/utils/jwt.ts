import jwt from "jsonwebtoken";
import { StringValue } from "ms";

export function createJwtToken(
  payload: any,
  secret: string,
  expire?: StringValue,
) {
  return jwt.sign(
    payload,
    secret,
    expire
      ? {
          expiresIn: expire,
        }
      : {},
  );
}

export function verifyJwtToken(token: string, secret: string) {
  return jwt.verify(token, secret);
}
