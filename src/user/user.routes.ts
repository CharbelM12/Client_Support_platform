import {Router } from "express";
import isAuth from "../middlewares/isAuth.middleware";
import {validate} from "express-validation";
import userValidation from "./user.validation";
import UserController from "./user.controller";
const userController=new UserController();

const router=Router();

router.post("/signup/",validate(userValidation.signup),userController.signup);

router.post("/login/",validate(userValidation.login),userController.login);

router.put("/change-password/",isAuth,validate(userValidation.changePassword),userController.changePassword);



export default router