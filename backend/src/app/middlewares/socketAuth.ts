import { Socket } from "socket.io";
import { verifyJwtToken } from "../utils/jwt";
import cookie from "cookie";
import { AuthUser } from "../types/user.type";
import { JwtPayload } from "jsonwebtoken";

export async function socketAuth(socket: Socket, next: (err?: Error) => void) {
  try {
    const accessToken = socket.handshake.headers.authorization;
    if (!accessToken) throw new Error();

    const decode = verifyJwtToken(
      accessToken as string,
      process.env.JWT_ACCESS_TOKEN_SECRET as string,
    ) as AuthUser & JwtPayload;

    if (!decode) throw new Error();

    socket.data.user = {
      id: decode.id,
      phone: decode.phone,
      name: decode.name,
      photo: decode.phone,
    };
    next();
  } catch (error) {
    next();
  }
}
