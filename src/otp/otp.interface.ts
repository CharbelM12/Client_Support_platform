import {  Document, Schema } from "mongoose";

interface otp extends Document {  
    otpType: String;
    userEmail:String;
    otp:number;
    otpExpires:Date;
    otpLastSendDate:Date;
    userId:Schema.Types.ObjectId;
    retryCount:number;
    verificationToken:string;
    createdAt: Date;
    updatedAt: Date;
} 

interface forgotPassword{
   email:string,
}
interface validateOtp{
    email:string,
    otp:number
}
interface resetPassword{
    email:string,
    verificationToken:string,
    newPassword:string
}
export {otp,forgotPassword,validateOtp,resetPassword}