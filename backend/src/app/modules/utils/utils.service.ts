import qr from "qrcode";
import { AppError } from "../../errors/AppError";
import { verifyJwtToken } from "../../utils/jwt";
import { JwtPayload } from "jsonwebtoken";
import { AuthUser } from "../../types/user.type";
import { removeClient } from "../../whats-app/client";
import { getClient } from "../../whats-app/client";
import { SendMessagePayload } from "./utils.interface";

class UtilsService {
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

    const client = await getClient(authUser.id);
    const { users, message } = payload;
    for (const user of users) {
      for (let i = 0; i < user.count; i++) {
        await client.sendMessage(user.number + "@c.us", message);
      }
    }
  }
}

export default new UtilsService();
