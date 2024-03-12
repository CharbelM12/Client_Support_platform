import userModel from "./user.model";
import {user,changePassword,login} from "./user.interface"
import statusCodes from "../configs/errorCodes.config";
import mongoose from "mongoose";
import {SHA256} from "crypto-js";
import moment from "moment";
import config from "../configs/config";
import errorMessages from "../errorMessages"
import generateAccessTokens from "../utils/jwt.utils";

class UserService{
  async signup(reqBody:user):Promise<void> {
        const user = await userModel.findOne({ email: reqBody.email });
        if (user) {
          const error:any = new Error(errorMessages.emailAlreadyExist);
          error.statusCode = statusCodes.conflict;
          throw error;
        }
        await new userModel({
          email: reqBody.email,
          password: SHA256(reqBody.password as string).toString(),
          firstName:reqBody.firstName,
          lastName:reqBody.lastName,
          isVip:reqBody.isVip,
          isAdmin:reqBody.isAdmin
        }).save();
      }

  async login(reqBody:login) :Promise<{accessToken:string,tokenExpiration:Date,userId:mongoose.Schema.Types.ObjectId}>{
        const user = await userModel.findOne({ email: reqBody.email });
        if (!user) {
          const error:any = new Error(errorMessages.incorrectCredentials);
          error.status = statusCodes.notAuthenticated;
          throw error;
        } else{
          await this.checkIsLocked(user.email as string);
          if (user.password !== SHA256(reqBody.password as string).toString()) {
            const error:any = new Error(errorMessages.incorrectCredentials);
            error.status = statusCodes.notAuthenticated;
            throw error;
          } else {
            const payload = {
              email: user.email,
              userId: user._id.toString(),
            };
            const accessToken =  generateAccessTokens(payload);
            const tokenExpiration=moment().add(config.momentAddParams.duration as moment.DurationInputArg1,config.momentAddParams.unit as moment.DurationInputArg2).toDate();
            const userId=user._id
            return {accessToken,tokenExpiration,userId};
          }
        }  
      }

  async changePassword(reqBody:changePassword,userId:mongoose.Schema.Types.ObjectId):Promise<void>{
      const user=await userModel.findOne({_id:userId})
      if (user!.password !== SHA256(reqBody.currentPassword).toString()){
        const error:any = new Error(errorMessages.incorrectCredentials);
          error.statusCode = statusCodes.notAuthenticated;
          throw error;
      }else{
        await userModel.updateOne({_id:userId},{$set:{password:SHA256(reqBody.newPassword).toString()}})
      }
    }

    //this function was used in the otp service
  async findUserByEmail(email:string):Promise<user>{
   const user=await userModel.findOne({email:email})
   if (!user){
    const error:any = new Error(errorMessages.userNotFound);
    error.statusCode = statusCodes.notFound;
    throw error;
   }else{
    return user
   } 
  }

  //this function was used to lock the user in otp service when the retryCount field exceeds 5 
  async lockUser(email:string):Promise<void>{
   await userModel.updateOne({email:email},{$set:{isLocked:true,lockedUntil:moment().add(config.momentAddParams.duration as moment.DurationInputArg1,config.momentAddParams.unit as moment.DurationInputArg2)}})
  }

  //the function was used to chekc if the user was locked. 
  async checkIsLocked(email:string):Promise<void>{
   const user=await userModel.findOne({email:email})
    if(user!.isLocked ===true && moment(user!.lockedUntil).isAfter(moment())){
      const error:any=new Error(errorMessages.lockedAccount);
     error.statusCode=statusCodes.forbidden
     throw error
    }else if (user!.isLocked ===true && moment(user!.lockedUntil).isBefore(moment())){
       await userModel.updateOne({email:email},{$set:{isLocked:false}})
    }else if (user!.isLocked===false){ 
    }
  }
  //this function was used in the otp service to reset the password
  async resetPassword(email:string,password:string):Promise<void>{
    await userModel.updateOne({email:email},{$set:{password:SHA256(password).toString()}})
  }
}
export default UserService