import {Request,Response,NextFunction} from "express"
import config from "../configs/config";
const corsMiddleware=(req: Request, res: Response, next: NextFunction) => {
    res.setHeader(
        "Access-Control-Allow-Origin",
        config.corsHeaders.allowedOrigin
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        config.corsHeaders.allowedMethods
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        config.corsHeaders.allowedHeaders
    );
    next();
}
export default corsMiddleware;