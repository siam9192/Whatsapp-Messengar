import { Server } from "socket.io";
import { registerEvents } from "./events";
import { registerClientEvents } from "../whats-app/events";
import { createClient, getClient, watchClient } from "../whats-app/client";
import { socketAuth } from "../middlewares/socketAuth";
import { generateUserId } from "../utils/helpers";
import { AuthUser } from "../types/user.type";
import { Client } from "whatsapp-web.js";

let io: Server | null = null;

function setIo(server: Server) {
  io = server;
}

export function initIO(io: Server) {
  io.use(socketAuth);

  io.on("connection", async (socket) => {
    try {
      registerEvents(socket);

      const user = socket.data.user as AuthUser | undefined;
      const userId = user?.id ?? generateUserId();

      let client: Client | null = null;

      if (user) {
        client = getClient(userId)?.client ?? null;

        if (!client) {
          const timeout = setTimeout(() => {
            socket.emit("logout", { message: "Logout successfully" });
            socket.disconnect();
            clearTimeout(timeout)
          },500);
          
          return;
        }
      } else {
        client = (await createClient(userId)) as Client;
      }
      client = client as Client;
      watchClient(client, userId, Boolean(user));
      registerClientEvents(client, userId, socket.id);

      console.log("Connected:", {
        userId,
        socketId: socket.id,
      });
    } catch (error: any) {
      console.error("Socket connection error:", error.message);
      socket.disconnect(true);
    }
  });
}

export function getIo() {
  return io as Server;
}
