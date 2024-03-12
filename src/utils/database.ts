import mongoose from "mongoose";
import config from "../configs/config";
const connect=async ():Promise<void>=>{
    mongoose.connect(config.mongoUri!)
}
export default connect