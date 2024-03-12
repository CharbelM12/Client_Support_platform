import mongoose from "mongoose"
import complaintModel from "./complaint.model"
import {complaint,getClientComplaintQuery} from "./complaint.interface"
import statusCodes from "../configs/errorCodes.config"
import errorMessages from "../errorMessages"
import RoomService from "../room/room.service";
const roomService=new RoomService();
import CategoryService from "../category/category.service";
import complaintConfig from "./complaint.config";
import { io,getReceiverSocketId} from "../socket/socket"
const categoryService=new CategoryService();

class ComplaintService{ 
async createComplaint(reqBody:complaint,userId:mongoose.Schema.Types.ObjectId):Promise<void>{
    //for every categoryId a check was done to make sure it is a valid categoryId
    for (const categoryId of reqBody.categoryIds!) {
        const category = await categoryService.getCategoryDetails(categoryId.toString())    
    }
    await new complaintModel({
      title:reqBody.title,
      body:reqBody.body,
      categoryIds:reqBody.categoryIds,
      createdBy:userId
     }).save()
}
async getMyComplaints(userId:mongoose.Schema.Types.ObjectId,page:number,limit:number):Promise<{ complaints: complaint[], page: number, lastPage: number, hasPreviousPage: boolean, hasnextPage: boolean, totalCategoriesCount: number }>{
    const complaints= await complaintModel.find({createdBy:userId}).skip((page-1)).limit(limit);
    const totalCategoriesCount=await complaintModel.find({createdBy:userId}).countDocuments()
    const lastPage=Math.ceil(totalCategoriesCount/limit);
    const hasPreviousPage=page>1;
    const hasnextPage=page<lastPage
    return {complaints,page,lastPage,hasPreviousPage,hasnextPage,totalCategoriesCount}
}
async getComplaintDetails(complaintId:string,userId:mongoose.Schema.Types.ObjectId):Promise<complaint>{
    const complaint= await complaintModel.findOne({_id:complaintId})
    if (!complaint){
        const error:any = new Error(
            errorMessages.complaintNotFound
          );
          error.statusCode = statusCodes.notFound;
          throw error;
    }else if (complaint!.createdBy.toString() !== userId.toString()) {
        const error:any = new Error(
          errorMessages.forbidden
        );
        error.statusCode = statusCodes.forbidden;
        throw error;
      } else {
        return complaint;
      }
}
async deleteComplaint(complaintId:string,userId:mongoose.Schema.Types.ObjectId):Promise<void>{
    await this.getComplaintDetails(complaintId,userId)
    await complaintModel.deleteOne({_id:complaintId})     
      
}
async updateStatus(complaintId:string,status:string,userId:mongoose.Schema.Types.ObjectId):Promise<void>{
    const complaint=await complaintModel.findOne({_id:complaintId})
    if (!complaint){
        const error:any = new Error(
            errorMessages.complaintNotFound
        );
        error.statusCode = statusCodes.notFound;
        throw error;
    }else {
        await complaintModel.updateOne({_id:complaintId},{$set:{status:status}})
        await roomService.createRoom(userId,complaint.createdBy,complaintConfig.updatedStatusMessage);
        const receiverSocketId = getReceiverSocketId(complaint.createdBy.toString());
		io.to(receiverSocketId).emit("newMessage", complaintConfig.updatedStatusMessage);	
    }
}
async getClientsComplaints(userId:string,status:string,page:number,limit:number):Promise<{ complaints: complaint[], page: number, lastPage: number, hasPreviousPage: boolean, hasnextPage: boolean, totalCategoriesCount: number }>{
    const query:getClientComplaintQuery={};
    if (userId){
       query.createdBy=userId;
    }
    console.log(query)
    if (status){
       query.status=status
     }
    const complaints= await complaintModel.find(query).skip((page-1)*limit).limit(limit).sort({createdAt:-1});
    const totalCategoriesCount=await complaintModel.find(query).countDocuments()
    const lastPage=Math.ceil(totalCategoriesCount/limit);
    const hasPreviousPage=page>1;
    const hasnextPage=page<lastPage
    return {complaints,page,lastPage,hasPreviousPage,hasnextPage,totalCategoriesCount}
}
}
export default ComplaintService