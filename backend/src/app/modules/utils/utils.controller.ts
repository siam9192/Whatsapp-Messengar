import { catchAsync } from "../../utils/catchAsync";
import utilsService from "./utils.service";
import fs from "fs";
class UtilsController {
  generateQr = catchAsync(async (req, res) => {
    const qrBuffer = await utilsService.generateQr(req.params.code as string);
    res.setHeader("Content-Type", "image/png+xml");
    res.send(qrBuffer);
  });
}

export default new UtilsController();
