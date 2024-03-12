import {Request,Response,NextFunction} from "express"
import  jwt, { JwtPayload } from "jsonwebtoken"
import errorMessages from "../errorMessages";
import  statusCodes from "../configs/errorCodes.config";
import config from "../configs/config";
import  HttpException from"../exceptions/httpException";

const isAuth = async (req:Request, res:Response, next:NextFunction) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const error:any = new Error(errorMessages.notAuthenticated);
    error.statusCode = statusCodes.notAuthenticated;
    next(new HttpException(error.statusCode, error.message));
  }else{
  const token = authHeader!.split(" ")[1];
  let decodedToken!: JwtPayload;
  try {
    decodedToken = jwt.verify(token, config.tokens.accessTokenSecret!) as JwtPayload;
  } catch (error:any) {
    error = new Error(errorMessages.notAuthenticated);
    error.statusCode = statusCodes.notAuthenticated;
    next(new HttpException(error.statusCode, error.message));
  }
  if (!decodedToken) {
    const error:any = new Error(errorMessages.notAuthenticated);
    error.statusCode = statusCodes.notAuthenticated;
    next(new HttpException(error.statusCode, error.message));
  } else {
    (req as any).userId = decodedToken.userId;
    next();
  }
  }
};
export default isAuth;