import dotenv from 'dotenv';
dotenv.config();
export default {
port:process.env.PORT,
mongoUri:process.env.DB_CONNECTION_STRING,
tokens: {
  accessTokenExpiry: "1h",
  accessTokenSecret:process.env.ACCESS_TOKEN_SECRET,
},
timestamps:{
  timestampsValue: true,
},
collections:{
  userCollection:"User",
  categoryCollection:"Category",
  complaintCollection:"Complaint",
  userOtpCollection:"Userotp",
  roomCollection:"Room"
},
gmail: {
  service: "gmail",
  user: process.env.USER,
  pass: process.env.PASS,
},
corsHeaders: {
  allowedOrigin: "*",
  allowedMethods: "OPTIONS, GET, POST, PUT, PATCH, DELETE",
  allowedHeaders: "Content-Type, Authorization",
},
momentAddParams:{
  duration:1,
  unit:"h"
},
validation:{
  regexValue:/^[0-9a-fA-F]{24}$/,
  pageAndLimitMinValue:1
},
socketIo:{
  corsOrigin: ["http://localhost:3000"],
  corsMethods: ["GET", "POST"]
  },
}
