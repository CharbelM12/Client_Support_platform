import express from "express";
const router = express.Router();
import userRoutes from "./user/user.routes";
import categoryRoutes from "./category/category.routes";
import complaintRoutes from "./complaint/complaint.routes";
import otpRoutes from "./otp/otp.routes";

router.use("/user", userRoutes);
router.use("/complaint",complaintRoutes);
router.use("/category",categoryRoutes);
router.use("/otp",otpRoutes)
export default  router;
