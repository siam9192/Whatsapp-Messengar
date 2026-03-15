import { Client } from "whatsapp-web.js";
import { getIo } from "../socket/init";
import { createJwtToken } from "../utils/jwt";
import qrCode from "qrcode";
import { addClient, getClient, logout } from "./client";

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
    const timeout = setTimeout(async () => {
      const existing = getClient(userId);
      const state = await existing?.client.getState();
      console.log({ existing: !!existing, state });
      if (!existing || !state) {
        await logout(userId);
      }
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
      addClient(userId, socketId, client);
      io.to(socketId).emit("ready", accessToken);
      clearTimeout(timeout);
    }, 1000);
  });

  client.on("message", async (message) => {
    const io = getIo();

    const contact = await message.getContact();

    if (message.type === "chat") {
      io.emit("message", {
        sender: {
          name: contact.pushname || contact.name,
          number: contact.number,
        },
        body: message.body,
      });
    }
  });
}
