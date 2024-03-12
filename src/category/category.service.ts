import mongoose from "mongoose"
import categoryModel from "./category.model"
import {category} from "./category.interface"
import statusCodes from "../configs/errorCodes.config"
import errorMessages from "../errorMessages"

class CategoryService{ 
async createCategory(reqBody:category,userId:mongoose.Schema.Types.ObjectId):Promise<void>{
  const foundCategoryName = await categoryModel.findOne({
    name: reqBody.name,
  });
  if (foundCategoryName) {
    const error:any = new Error(errorMessages.categoryAlreadyExists);
    error.statusCode = statusCodes.conflict;
    throw error;
  } else{
     await new categoryModel({
      name:reqBody.name,
      description:reqBody.description,
      createdBy:userId
     }).save()
    }
}
async getCategories(page:number,limit:number):Promise<{categories:category[],page:number,lastPage:number,hasPreviousPage:boolean,hasnextPage:boolean,totalCategoriesCount:number}>{
 const categories=await categoryModel.find().skip((page-1)*limit).limit(limit)
 const totalCategoriesCount=await categoryModel.find().countDocuments()
 const lastPage=Math.ceil(totalCategoriesCount/limit);
 const hasPreviousPage=page>1;
 const hasnextPage=page<lastPage
 return {categories,page,lastPage,hasPreviousPage,hasnextPage,totalCategoriesCount}
}
async getCategoryDetails(categoryId:string):Promise<category>{
    const category= await categoryModel.findOne({_id:categoryId})
    if (!category){
        const error:any = new Error(
            errorMessages.categoryNotFound
          );
          error.statusCode = statusCodes.notFound;
          throw error;
    }else {
        return category;
      }
}
async updateCategory(categoryId:string,reqBody:category,userId:mongoose.Schema.Types.ObjectId):Promise<void>{
     await this.getCategoryDetails(categoryId)
     await categoryModel.updateOne({_id:categoryId},{$set:reqBody,updatedBy:userId})
}
async deleteCategory(categoryId:string):Promise<void>{
       await this.getCategoryDetails(categoryId)
       await categoryModel.deleteOne({_id:categoryId})      
}
async getCategoriesByAdmin(userId:string):Promise<category[]>{
 return await categoryModel.find({createdBy:userId})
}
}
export default CategoryService