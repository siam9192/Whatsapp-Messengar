import { Router } from "express";
import utilsController from "./utils.controller";
import { auth } from "../../middlewares/auth";

const router = Router();

router.get("/qr/:token", utilsController.generateQr);
router.post("/logout",auth,utilsController.logout);
router.post("/message",auth,utilsController.sendMessage)
export const utilsRouter = router;
