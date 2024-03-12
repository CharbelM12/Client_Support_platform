import {Request,Response,NextFunction} from "express";
import config from "../configs/config";
import HttpException from "../exceptions/httpException";
import ComplaintService from "./complaint.service";

const complaintService=new ComplaintService();
class ComplaintController{
    async createComplaint(req:Request,res:Response,next:NextFunction):Promise<void>{
        try{
         await complaintService.createComplaint(req.body,(req as any).userId)
         res.end()
        }catch(error:any){
            next(new HttpException(error.statusCode,error.message))
        }
   }
   async getMyComplaints(req:Request,res:Response,next:NextFunction):Promise<void>{
    try{
        const {complaints,page,lastPage,hasPreviousPage,hasnextPage,totalCategoriesCount}=await complaintService.getMyComplaints((req as any).userId,parseInt((req.query as any ).page),parseInt((req.query as any).limit))
        res.send({complaints:complaints,page:page,lastPage:lastPage,hasPreviousPage:hasPreviousPage,hasnextPage:hasnextPage,totalCategoriesCount:totalCategoriesCount})
       }catch(error:any){
           next(new HttpException(error.statusCode,error.message))
       }
   }
   async getComplaintDetails(req:Request,res:Response,next:NextFunction):Promise<void>{
    try{
        const complaint=await complaintService.getComplaintDetails(req.params.complaintId,(req as any).userId)
        res.send(complaint)
       }catch(error:any){
           next(new HttpException(error.statusCode,error.message))
       } 
   }
   
   async deleteComplaint(req:Request,res:Response,next:NextFunction):Promise<void>{
    try{
        await complaintService.deleteComplaint(req.params.complaintId,(req as any).userId)
        res.end()
       }catch(error:any){
           next(new HttpException(error.statusCode,error.message))
       }    
   }
   async getClientsComplaints(req:Request,res:Response,next:NextFunction):Promise<void>{
    try{
        const {complaints,page,lastPage,hasPreviousPage,hasnextPage,totalCategoriesCount} = await complaintService.getClientsComplaints(req.query.userId as string,req.query.status as string,parseInt(req.query.page as string),parseInt(req.query.limit as string))
        res.send({complaints:complaints,page:page,lastPage:lastPage,hasPreviousPage:hasPreviousPage,hasnextPage:hasnextPage,totalCategoriesCount:totalCategoriesCount})
    }catch(error:any){
        next(new HttpException(error.statusCode,error.message))
    }
   }
   async updateStatus(req:Request,res:Response,next:NextFunction):Promise<void>{
    try{
      await complaintService.updateStatus(req.params.complaintId,req.body.status,(req as any).userId )
      res.end()
    }catch(error:any){
        next(new HttpException(error.statusCode,error.message))
    }
   }
}
export default ComplaintController