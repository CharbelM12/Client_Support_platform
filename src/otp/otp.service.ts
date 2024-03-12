import otpModel  from "./otp.model"
import statusCodes from "../configs/errorCodes.config"
import errorMessages from "../errorMessages";
import randomString from "randomstring";
import moment from "moment";
import { forgotPassword,validateOtp,resetPassword } from "./otp.interface"; 
import sendEmail from "../utils/email";
import otpConfig from "./otp.config";
import config from "../configs/config"
import UserService from "../user/user.service";
const userService=new UserService();

class OtpService{ 

async forgotPassword(reqBody:forgotPassword):Promise<void>{
    const user= await userService.findUserByEmail(reqBody.email);
    await userService.checkIsLocked(user.email as string)
    const userOtp={
            otpType:otpConfig.otp.type,
            userEmail:reqBody.email,
            otp:randomString.generate({
                length:otpConfig.otp.length,
                charset:otpConfig.otp.charset
            }),
            otpExpires:moment().add(config.momentAddParams.duration as moment.DurationInputArg1,config.momentAddParams.unit as moment.DurationInputArg2),
            otpLastSendDate:moment(),
            userId:user._id
        }
        await otpModel.updateOne({userEmail:reqBody.email},{$set:userOtp,$inc:{retryCount:1}},{upsert:true})
        const mailOptions = {
            from:otpConfig.mailOptions.from,
            to: reqBody.email,
            subject: "Forgot Password",
            html: `<p>Use the following number to change your password: <strong>${userOtp.otp}</strong></p>`,
          };
          return await sendEmail(mailOptions); 
}
async resendOtp(reqBody:forgotPassword):Promise<void>{
 await userService.findUserByEmail(reqBody.email);
 await userService.checkIsLocked(reqBody.email)
 const userOtp=await otpModel.findOne({userEmail:reqBody.email})

 if (userOtp!.retryCount>=otpConfig.maxValues.retryCountMaxValue){
    await userService.lockUser(reqBody.email)
    await otpModel.updateOne({userEmail:reqBody.email},{$set:{retryCount:otpConfig.defaultValues.retryCountDefaultValue}})
     const error:any=new Error(errorMessages.lockedAccount);
     error.statusCode=statusCodes.forbidden
     throw error
 }else{
    const newOtp={
        otp:randomString.generate({
            length:otpConfig.otp.length,
            charset:otpConfig.otp.charset
        }),
        otpExpires:moment().add(config.momentAddParams.duration as moment.DurationInputArg1,config.momentAddParams.unit as moment.DurationInputArg2),
        otpLastSendDate:moment(),
    };
   await otpModel.updateOne({userEmail:reqBody.email},{$set:newOtp,$inc:{retryCount:1}}) 
   const mailOptions = {
    from:otpConfig.mailOptions.from,
    to: reqBody.email,
    subject: "Forgot Password",
    html: `<p>Use the following number to change your password: <strong>${newOtp.otp}</strong></p>`,
  };
  return await sendEmail(mailOptions); 
 }
}
async validateOtp(reqBody:validateOtp):Promise<string>{
  const foundOtp=await otpModel.findOne({userEmail:reqBody.email})
  if (!foundOtp){
    const error:any=new Error(errorMessages.userNotFound)
    error.statusCode=statusCodes.notFound
    throw error
  }else{
    await userService.checkIsLocked(reqBody.email);
    if (foundOtp!.otp===reqBody.otp && moment(foundOtp.otpExpires).isAfter(moment())){
        const verificationToken=randomString.generate(otpConfig.verificationToken.format);
        await otpModel.updateOne({userEmail:reqBody.email},{$set:{verificationToken:verificationToken,retryCount:otpConfig.defaultValues.retryCountDefaultValue}});
        return verificationToken
    }else {
      const error:any =new Error(errorMessages.invalidOtp);
      error.statusCode=statusCodes.notAuthenticated;
      throw error
    }
  } 
}
async resetPassword(reqBody:resetPassword):Promise<void>{
 const otp=await otpModel.findOne({userEmail:reqBody.email})
 if (!otp){
    const error:any=new Error(errorMessages.userNotFound)
    error.statusCode=statusCodes.notFound
    throw error
 }else{
    await userService.checkIsLocked(reqBody.email);
    if (otp.verificationToken===reqBody.verificationToken && moment(otp.otpExpires).isAfter(moment())){
     await userService.resetPassword(reqBody.email,reqBody.newPassword)
    }else{
        const error:any=new Error(errorMessages.invalidVerificationToken);
        error.statusCode=statusCodes.notAuthenticated
        throw error
    }
 }
}

}
export default OtpService