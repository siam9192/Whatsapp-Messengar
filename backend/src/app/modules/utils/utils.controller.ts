import { catchAsync } from "../../utils/catchAsync"
import utilsService from "./utils.service"

 class UtilsController  {
  generateQr = catchAsync(async (req,res)=>{
     const filePath = await utilsService.generateQr(req.body)
     res.sendFile(filePath)
  })
 }


export default new UtilsController()