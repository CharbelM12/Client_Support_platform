import {Request,Response,NextFunction} from "express";
import HttpException from "../exceptions/httpException";
import OtpService from "./otp.service";
const otpService=new OtpService();

class OtpController{
    async forgotPassword(req:Request,res:Response,next:NextFunction):Promise<void>{
        try{
         await otpService.forgotPassword(req.body)
         res.end()
        }catch(error:any){
            next(new HttpException(error.statusCode,error.message))
        }
   }
   async resendOtp(req:Request,res:Response,next:NextFunction):Promise<void>{
    try{
     await otpService.resendOtp(req.body)
     res.end()
    }catch(error:any){
        next(new HttpException(error.statusCode,error.message))
    }
}
async validateOtp(req:Request,res:Response,next:NextFunction):Promise<void>{
    try{
     const verificationToken=await otpService.validateOtp(req.body)
     res.send(verificationToken)
    }catch(error:any){
        next(new HttpException(error.statusCode,error.message))
    }
}
async resetPassword(req:Request,res:Response,next:NextFunction):Promise<void>{
    try{
     await otpService.resetPassword(req.body)
     res.end()
    }catch(error:any){
        next(new HttpException(error.statusCode,error.message))
    }
}
   
   
}
export default OtpController