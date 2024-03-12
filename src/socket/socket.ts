import { Server, Socket } from "socket.io";
import http from "http";
import express from "express";
import socketIdObject from "./interface";
import config from "../configs/config";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: config.socketIo.corsOrigin,
    methods: config.socketIo.corsMethods,
  },
});


const socketIdObject:socketIdObject = {};

io.on("connection", (socket: Socket) => {
  //Assuming userId was passed by the client
  const userId = socket.handshake.query.userId as string; 
  socketIdObject[userId] = socket.id;

  socket.on("disconnect", () => {
    //when the user disconnect related userId will be removed
    delete socketIdObject[userId];
  });
});

//this function was used in the complaint service in order to get the socketId of the user who created the order
const getReceiverSocketId=(userId: string): string =>  {
  return socketIdObject[userId];
}

export { app, io, server, getReceiverSocketId };