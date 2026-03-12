import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: [process.env.CLIENT_URL as string],
  }),
);

export default app;
