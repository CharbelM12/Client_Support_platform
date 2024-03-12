import {Request,Response, NextFunction} from "express"
import userModel from "../user/user.model"
import statusCode from "../configs/errorCodes.config";
import errorMessages from "../errorMessages"
import { Http2ServerResponse } from "http2";
import HttpException from "../exceptions/httpException";

const isAdmin = async (req:Request, res:Response, next:NextFunction) => {
    const foundUser = await userModel.findById((req as any).userId);
    if (!foundUser!.isAdmin) {
      const error:any = new Error(errorMessages.forbidden);
      error.statusCode = statusCode.forbidden;
      next(new HttpException(error.statusCode,error.message));
    } else {
      next();
    }
  };
  export default isAdmin;