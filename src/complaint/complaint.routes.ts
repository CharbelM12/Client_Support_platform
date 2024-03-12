import {Router } from "express";
import isAuth from "../middlewares/isAuth.middleware";
import isAdmin from "../middlewares/isAdmin.middleware";
import {validate} from "express-validation";
import complaintValidation from "./complaint.validation";
import ComplaintController from "./complaint.controller";
const complaintController=new ComplaintController();


 const router=Router();

 router.post("/",isAuth,validate(complaintValidation.createComplaint),complaintController.createComplaint);

 router.get("/",isAuth,validate(complaintValidation.getMyComplaints),complaintController.getMyComplaints);

 router.get("/:complaintId",isAuth,validate(complaintValidation.getComplaintDetails),complaintController.getComplaintDetails);

 router.delete("/:complaintId",isAuth,validate(complaintValidation.deleteComplaint),complaintController.deleteComplaint);

 router.get("/admin/client/",isAuth,isAdmin,validate(complaintValidation.getClientComplaints), complaintController.getClientsComplaints);

 router.put("/admin/:complaintId",isAuth,isAdmin,validate(complaintValidation.updateStatus),complaintController.updateStatus);

 export default router