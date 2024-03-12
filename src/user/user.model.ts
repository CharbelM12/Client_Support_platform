import { Schema, model } from 'mongoose';
import {user} from "./user.interface"
import config from '../configs/config';
import userConfig from './user.config';

const userSchema = new Schema({
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    isVip: {
        type: Boolean,
        default: userConfig.defaultValues.booleanDefaultValue
    },
    isAdmin: {
        type: Boolean,
        default: userConfig.defaultValues.booleanDefaultValue
    },
    isLocked: {
        type: Boolean,
        default: userConfig.defaultValues.booleanDefaultValue
    },
    lockedUntil:Date
},
 { timestamps: config.timestamps.timestampsValue });

 userSchema.index({email:1})

const userModel=model<user>(config.collections.userCollection, userSchema);

export default userModel;