import { Router } from "express";
import controller from "./controller";
import { auth } from "../middlewares/auth";

export const router = Router();
router.get("/me", auth, controller.getMe);
router.get("/:number/existence", auth, controller.checkUserExistence);
router.post("/logout", auth, controller.logout);
router.post("/message", auth, controller.sendMessage);
