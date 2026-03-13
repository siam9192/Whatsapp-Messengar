import qr from "qrcode";
import { CreateQrPayload } from "./utils.interface";
import path from "path";

class UtilsService {
  async generateQr(payload: CreateQrPayload) {
    const filePath = path.join(
      __dirname,
      `/qr_images/qr-${Date.now()}-c${payload.code}`,
    );
    await qr.toFile(filePath, payload.code, {
      width: 300,
      type: "svg",
      margin: 5,
    });
    return filePath;
  }
}

export default new UtilsService();
