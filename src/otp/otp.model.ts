import { Schema, model} from 'mongoose';
import {otp} from "./otp.interface";
import config from '../configs/config';
import otpConfig from './otp.config';

const otpSchema = new Schema({
    otpType: String,
    userEmail:String,
    otp:Number,
    otpExpires:Date,
    otpLastSendDate:Date,
    userId: {
        type: Schema.Types.ObjectId,
        ref: config.collections.userCollection,
    },
    retryCount:{
        type:Number,
        default:otpConfig.defaultValues.retryCountDefaultValue
    },
    verificationToken:String,
}, { timestamps: config.timestamps.timestampsValue });
otpSchema.index({ userEmail: 1 });
otpSchema.index({userId:1})

const otpModel = model<otp>(config.collections.userOtpCollection, otpSchema);
export default otpModel;