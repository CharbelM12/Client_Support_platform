import {Request,Response,NextFunction} from "express";
import config from "../configs/config";
import HttpException from "../exceptions/httpException";
import customError from "../error.interface";
import CategoryService from "./category.service";
const categoryService=new CategoryService();


class CategoryController{
    async createCategory(req:Request,res:Response,next:NextFunction):Promise<void>{
        try{
         await categoryService.createCategory(req.body,(req as any).userId)
         res.end()
        }catch(error:any){
            next(new HttpException(error.statusCode,error.message))
        }
   }
   async getCategories(req:Request,res:Response,next:NextFunction):Promise<void>{
    try{
       const {categories,page,lastPage,hasPreviousPage,hasnextPage,totalCategoriesCount}= await categoryService.getCategories(parseInt(req.query.page as string),parseInt(req.query.limit as string))
        res.send({categories:categories,page:page,lastPage:lastPage,hasPreviousPage:hasPreviousPage,hasnextPage:hasnextPage,totalCategoriesCount:totalCategoriesCount})
       }catch(error:any){
           next(new HttpException(error.statusCode,error.message))
       }
   }
   async getCategoryDetails(req:Request,res:Response,next:NextFunction):Promise<void>{
    try{
        const category=await categoryService.getCategoryDetails(req.params.categoryId)
        res.send(category)
       }catch(error:any){
           next(new HttpException(error.statusCode,error.message))
       } 
   }
   async updateCategory(req:Request,res:Response,next:NextFunction):Promise<void>{
    try{
        await categoryService.updateCategory(req.params.categoryId,req.body,(req as any).userId)
        res.end()
       }catch(error:any){
           next(new HttpException(error.statusCode,error.message))
       }
   }
   async deleteCategory(req:Request,res:Response,next:NextFunction):Promise<void>{
    try{
        await categoryService.deleteCategory(req.params.categoryId)
        res.end()
       }catch(error:any){
           next(new HttpException(error.statusCode,error.message))
       }    
   }
   async getCategoriesByAdmin(req:Request,res:Response,next:NextFunction):Promise<void>{
     try{
           const categories=await categoryService.getCategoriesByAdmin(req.query.userId as string)
           res.status(200).send(categories)
     }catch(error:any){
     next(new HttpException(error.statusCode,error.message))
     }
   }
}
export default CategoryController