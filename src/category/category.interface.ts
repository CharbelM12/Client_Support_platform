import { Document, Schema } from "mongoose";

export  interface category extends Document {
    name:String    
    description: String;
    createdBy: Schema.Types.ObjectId
    updatedBy: Schema.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
} 
