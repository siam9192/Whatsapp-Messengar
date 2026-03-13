import qr from "qrcode";
import path from "path";
import fs from "fs"
class UtilsService {
 async generateQr(code: string) {
  const dir = path.join(process.cwd(), "qr-images");
  // if (!fs.existsSync(dir)) fs.mkdirSync(dir);

  // const filePath = path.join(dir, `qr-${Date.now()}.svg`);

  // await qr.toFile(filePath, code, {
  //   width: 300,
  //   type: "svg",
  //   margin: 5,
  // });

  // return filePath; 

  const qrBuffer = await qr.toBuffer(code as string, {
  type:"png",
  width: 300,
  margin: 5,
   });

 return qrBuffer
}

}

export default new UtilsService();
