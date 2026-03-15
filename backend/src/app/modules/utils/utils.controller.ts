import status from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import utilsService from "./utils.service";

class UtilsController {
  generateQr = catchAsync(async (req, res) => {
    const qrBuffer = await utilsService.generateQr(req.params.token as string);
    res.setHeader("Content-Type", "image/png+xml");
    res.send(qrBuffer);
  });

  sendMessage = catchAsync(async (req:any, res) => {
    const result = await utilsService.sendMessage(req.user!,req.body);
       res.status(status.OK).json({
      message:"Message successfully changed"
    })
  });



  logout = catchAsync(async (req:any, res) => {
    await utilsService.logout(req.user!);
    res.clearCookie("accessToken");
    res.status(status.OK).json({
      message:"logout successful"
    })
  });
}

export default new UtilsController();
