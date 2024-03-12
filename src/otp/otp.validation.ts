import Joi from "joi";
import config from "../configs/config";
import otpConfig from "./otp.config";

  const forgotPassword = {
    email: Joi.string().required(),
  };
 const resendOtp={
    email: Joi.string().required(),
 }
 const validateOtp={
    email:Joi.string().required(),
    otp:Joi.number().min(otpConfig.validation.otpMinValue).max(otpConfig.validation.otpMaxValue).required()
 }
 const resetPasswod={
    email:Joi.string().required(),
    verificationToken:Joi.string().regex(config.validation.regexValue).required(),
    newPassword:Joi.string().required(),
 }

  const otpValidation = {
    forgotPassword:{
      body: Joi.object().keys(forgotPassword),
    },
    resendOtp:{
      body:Joi.object().keys(resendOtp)
    },
    validateOtp:{
      body:Joi.object().keys(validateOtp)
    },
    resetPassword:{
      body:Joi.object().keys(resetPasswod)
    } 
  };
  

export default otpValidation;