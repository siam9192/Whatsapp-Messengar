import { Server } from "socket.io";
import { registerEvents } from "./events";
import { registerClientEvents } from "../whats-app/events";
import { getClient } from "../whats-app/client";
import { socketAuth } from "../middlewares/socketAuth";
import { generateUserId } from "../utils/helpers";
import { AuthUser } from "../types/user.type";

let io: Server | null = null;

function setIo(server: Server) {
  io = server;
}

export function initIO(io: Server) {
    io.use(socketAuth)
    io.on("connection", (socket) => {
      registerEvents(socket);
      const user = socket.data.user as AuthUser | undefined;
      console.log(user)
      const userId = user?.id ?? generateUserId();
      console.log(user)
      const client = getClient(userId);
      registerClientEvents(client, userId, socket.id);
      console.log("connected","user-id:",userId,"socket-id:",socket.id)
    });

  setIo(io);
}

export function getIo() {
  return io as Server;
}
