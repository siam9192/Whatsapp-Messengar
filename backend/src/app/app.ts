import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import { initIO } from "./socket/init";
import { utilsRouter } from "./modules/utils/utils.route";
import notFoundHandler from "./middlewares/notFoundHandler";
import  cookieParser from "cookie-parser"
dotenv.config();
const app = express();

app.use(
  cors({
    origin: [process.env.CLIENT_URL as string],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposedHeaders: ["Set-Cookie"],
  }),
);

app.use(cookieParser())

app.use(express.json())

app.use("/api",utilsRouter)

app.use(notFoundHandler)

app.use((err:any,req:Request,res:Response,next:NextFunction)=>{
  console.log(err.message)
})

export const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: [process.env.CLIENT_URL as string],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposedHeaders: ["Set-Cookie"],
  },
});

initIO(io);
