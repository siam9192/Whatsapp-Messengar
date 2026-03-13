import { Client } from "whatsapp-web.js";
import { getIo } from "../socket/init";
import { createJwtToken } from "../utils/jwt";
import qrCode from "qrcode";

export function registerClientEvents(
  client: Client,
  userId: string,
  socketId: string,
) {
  client.on("qr", async (qr) => {
    const io = getIo();
    const url = await qrCode.toDataURL(qr);
    io.to(socketId).emit("qr", url);
  });

  client.on("ready", async () => {
    console.log("client-ready");
    const info = client.info;
    // const photo = await client.getProfilePicUrl(info.wid.user);
    const user = {
      id: userId,
      phone: info.wid.user,
      name: info.pushname,
      photo: null,
    };
    const io = getIo();
    const accessToken = createJwtToken(
      user,
      process.env.JWT_ACCESS_TOKEN_SECRET as string,
    );
    io.to(socketId).emit("ready", accessToken);
  });

 

  client.on("auth_failure", async () => {
    console.log("client-logout")
    const io = getIo();
    await client.logout();
    await client.destroy();
    io.to(socketId).emit("logout","logout successfully");
  });
}
