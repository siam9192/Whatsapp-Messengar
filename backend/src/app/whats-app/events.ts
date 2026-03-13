import { Client } from "whatsapp-web.js";
import { getIo } from "../socket/init";
import { createJwtToken } from "../utils/jwt";

export function registerClientEvents(client: Client,userId:string,socketId: string) {
  client.on("qr", (qr) => {
    const io = getIo();
    if (io) {
      io.to(socketId).emit("qr", qr);
    }
  });

  client.on("ready", async () => {
    const info = client.info;
    const photo = await client.getProfilePicUrl(info.wid.user);
    const user = {
      id:userId,
      phone: info.wid.user,
      name: info.pushname,
      photo: photo ?? null,
    };
    const io = getIo();
    const accessToken = createJwtToken(
      user,
      process.env.JWT_ACCESS_TOKEN_SECRET as string,
      "10m",
    );

    io.to(socketId).emit("set-cookie", {
      name: "access-token",
      value: accessToken,
      options: {
        httpOnly: true,
        secure: process.env.ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 1000 * 60 * 10,
      },
    });
  });

  client.on("disconnected", () => {
    client.initialize();
  });
}
