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

      let client;

      if (user) {
        client = getClient(userId)?.client;

        if (!client) {
          socket.emit("logout", { message: "Logout successfully" });
          socket.disconnect(true);
          return;
        }
      } else {
        client = await createClient(userId);
      }

      watchClient(client as Client, userId, !!user);
      registerClientEvents(client as Client, userId, socket.id);

      console.log("Connected:", {
        userId,
        socketId: socket.id,
      });
    } catch (error) {
      console.error("Socket connection error:", error);
      socket.disconnect(true);
    }
  });

  setIo(io);
}

export function getIo() {
  return io as Server;
}
