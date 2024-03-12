import {Request,Response,NextFunction} from "express";
import UserService from "./user.service";
import HttpException from "../exceptions/httpException";
const userService=new UserService();
class UserController{
    async signup(req:Request,res:Response,next:NextFunction):Promise<void>{
        try{
         await userService.signup(req.body)
         res.end()
        }catch(error:any){
            next(new HttpException(error.statusCode,error.message))
        }
   }
   async login(req:Request,res:Response,next:NextFunction):Promise<void>{
    try{
        const {accessToken,tokenExpiration,userId}=await userService.login(req.body)
        res.send({accessToken:accessToken,tokenExpiration:tokenExpiration,userId:userId})
       }catch(error:any){
           next(new HttpException(error.statusCode,error.message))
       }
   }
   async changePassword(req:Request,res:Response,next:NextFunction):Promise<void>{
    try{
        await userService.changePassword(req.body,(req as any).userId)
        res.end()
       }catch(error:any){
           next(new HttpException(error.statusCode,error.message))
       }
   }
}
export default UserController