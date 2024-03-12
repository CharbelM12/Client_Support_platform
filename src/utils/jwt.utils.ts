import jwt from "jsonwebtoken";
import config from "../configs/config"

const generateAccessTokens= (payload:object):string =>{
    const accessToken =  jwt.sign(payload, config.tokens.accessTokenSecret!, {
      expiresIn: config.tokens.accessTokenExpiry,
    });
    return accessToken;
  }
export default generateAccessTokens