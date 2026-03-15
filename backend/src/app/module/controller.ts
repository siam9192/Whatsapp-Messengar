import status from "http-status";
import { catchAsync } from "../utils/catchAsync";
import service from "./service";
import { AuthUser } from "../types/user.type";

class Controller {
  getMe = catchAsync(async (req:any, res) => {
    res.status(status.OK).json({
      success: true,
      message: "Current user info retrieved successfully",
      data: req.user as AuthUser,
    });
  });

  generateQr = catchAsync(async (req, res) => {
    const qrBuffer = await service.generateQr(req.params.token as string);
    res.setHeader("Content-Type", "image/png+xml");
    res.send(qrBuffer);
  });

  sendMessage = catchAsync(async (req: any, res) => {
    const result = await service.sendMessage(req.user!, req.body);
    res.status(status.OK).json({
      success: true,
      message: "Message successfully changed",
      data: result,
    });
  });

  checkUserExistence = catchAsync(async (req: any, res) => {
    const result = await service.checkUserExistence(req.user!, req.params.number);
    res.status(status.OK).json({
      success: true,
      message: "Result retrieved successfully",
      data: result,
    });
  });


  logout = catchAsync(async (req: any, res) => {
    await service.logout(req.user!);
    res.clearCookie("accessToken");
    res.status(status.OK).json({
      message: "logout successful",
    });
  });
}

export default new Controller();
