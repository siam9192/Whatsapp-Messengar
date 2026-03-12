import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import { initIO } from "./socket/init";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: [process.env.CLIENT_URL as string],
  }),
);

export const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: [process.env.CLIENT_URL as string],
  },
});

initIO(io);
