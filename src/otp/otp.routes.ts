import { Router } from "express";
import {validate} from "express-validation";
import otpValidation from "./otp.validation"
import OtpController from "./otp.controller";
const otpController=new OtpController();


 const router=Router();

 router.post("/forgot-password/",validate(otpValidation.forgotPassword),otpController.forgotPassword);

 router.put("/resend/",validate(otpValidation.resendOtp),otpController.resendOtp);

 router.put("/validate/",validate(otpValidation.validateOtp),otpController.validateOtp);

 router.put("/reset-password/",validate(otpValidation.resetPassword),otpController.resetPassword);

 export default router