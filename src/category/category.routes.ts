import {Router } from "express";
import isAuth from "../middlewares/isAuth.middleware";
import isAdmin from "../middlewares/isAdmin.middleware";
import { validate } from "express-validation";
import categoryValidation from "./category.validation";
import CategoryController from "./category.controller";
const categoryController=new CategoryController();

 const router=Router();

 router.post("/admin/",isAuth,isAdmin,validate(categoryValidation.createCategory),categoryController.createCategory);

 router.get("/admin/",isAuth,isAdmin,validate(categoryValidation.getCategories),categoryController.getCategories);

 router.get("/admin/:categoryId",isAuth,isAdmin,validate(categoryValidation.getCategoryDetails),categoryController.getCategoryDetails);

 router.put("/admin/:categoryId",isAuth,isAdmin,validate(categoryValidation.updateCategory),categoryController.updateCategory);

 router.delete("/admin/:categoryId",isAuth,isAdmin,validate(categoryValidation.deleteCategory),categoryController.deleteCategory);

 router.get("/by-admin/",validate(categoryValidation.getCategoriesByAdmin),categoryController.getCategoriesByAdmin)

 export default router