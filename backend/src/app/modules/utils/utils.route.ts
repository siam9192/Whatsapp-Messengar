import { Router } from "express";
import utilsController from "./utils.controller";

const router = Router();

router.get("/qr/:code", utilsController.generateQr);

export const utilsRouter = router;
