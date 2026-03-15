import qr from "qrcode";
import { AppError } from "../errors/AppError";
import { verifyJwtToken } from "../utils/jwt";
import { JwtPayload } from "jsonwebtoken";
import { AuthUser } from "../types/user.type";
import { removeClient } from "../whats-app/client";
import { getClient } from "../whats-app/client";
import { SendMessagePayload } from "./interface";
import status from "http-status";

class Service {
  async generateQr(token: string) {
    let code;

    try {
      const decode = verifyJwtToken(
        token,
        process.env.JWT_QR_CODE_SECRET as string,
      ) as { code: string } & JwtPayload;
      code = decode.code;
    } catch (error) {
      throw new AppError(400, "Invalid token");
    }

    const qrBuffer = await qr.toBuffer(code, {
      type: "png",
      width: 300,
      margin: 5,
    });

    return qrBuffer;
  }

  async logout(authUser: AuthUser) {
    await removeClient(authUser.id);
    return null;
  }

  async sendMessage(authUser: AuthUser, payload: SendMessagePayload) {
    const client = getClient(authUser.id)?.client;
    if (!client) throw new AppError(status.BAD_REQUEST, "Something went wrong");
    const { users, message } = payload;
    let failed = [];
    for (const user of users) {
      try {
        for (let i = 0; i < user.count; i++) {
          await client.sendMessage(user.number + "@c.us", message);
        }
      } catch (error) {
        failed.push(user.number);
      }
    }
    return { failed };
  }

  async checkUserExistence(authUser: AuthUser, number: string) {
    const client = getClient(authUser.id)?.client;
    if (!client) throw new AppError(status.BAD_REQUEST, "Something went wrong");
    const numberId = await client.getNumberId(number);
    return {
      status: !!numberId,
    };
  }
}

export default new Service();
