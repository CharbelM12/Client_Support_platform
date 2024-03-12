import config from "../configs/config";
import nodemailer from "nodemailer";
import statusCodes from "../configs/errorCodes.config"

const transporter = nodemailer.createTransport({
  service: config.gmail.service,
  auth: {
    user: config.gmail.user,
    pass: config.gmail.pass,
  },
});

const  sendEmail=async (mailOptions:any):Promise<void>=> {
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      const error:any = new Error("Cannot send email");
      error.statusCode = statusCodes.failedToSendEmail;
      throw error;
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}
export default sendEmail;