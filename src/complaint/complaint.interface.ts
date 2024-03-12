import { Document, Schema } from "mongoose";

export interface complaint extends Document {
    title:String    
    body: String;
    status: String,
    categoryIds:Schema.Types.ObjectId[],
    createdBy: Schema.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
} 
export interface getClientComplaintQuery {
    createdBy?:string;
    status?: string;
}