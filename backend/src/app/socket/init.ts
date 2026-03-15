import { Server } from "socket.io";
import { registerEvents } from "./events";
import { registerClientEvents } from "../whats-app/events";
import {
  addClientSocketId,
  createClient,
  getClient,
  watchClient,
} from "../whats-app/client";
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
      const user = socket.data.user as AuthUser | undefined;
      const userId = user?.id ?? generateUserId();
      registerEvents(socket, userId);

      let client: Client | null = null;

      // Authenticated user
      if (user) {
        const existing = getClient(userId);
        if (!existing?.client) {
          const timeout = setTimeout(() => {
            socket.emit("logout", { message: "Logout successfully" });
            socket.disconnect();
            clearTimeout(timeout);
          }, 500);
          return;
        }

        client = existing.client;
      }

      // Guest user
      else {
        client = (await createClient(userId)) as Client;
      }

      if (!client) {
        socket.disconnect(true);
        return;
      }

      addClientSocketId(userId, socket.id);
      // watchClient(client, userId, Boolean(user));
      registerClientEvents(client, userId, socket.id);

      console.log("Connected:", {
        userId,
        socketId: socket.id,
      });

      console.log("IDS>>>", getClient(userId)?.socketIds);
    } catch (error: any) {
      console.error("Socket connection error:", error.message);
      socket.disconnect(true);
    }
  });

  setIo(io);
}

export function getIo() {
  return io as Server;
}
