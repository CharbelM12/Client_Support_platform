import mongoose from "mongoose"
import roomModel from "./room.model"

class RoomService{ 
async createRoom(senderId:mongoose.Schema.Types.ObjectId,receiverId:mongoose.Schema.Types.ObjectId,message:string):Promise<void>{
    const room = await roomModel.findOne({
        participants: { $all: [senderId, receiverId] },
    });

    if (!room) {
       await new roomModel({
        participants:[senderId,receiverId],
        messages:[{
            senderId:senderId,
            receiverId:receiverId,
            message:message 
       }]
       }).save()
    }else{
     room.messages.push({senderId:senderId,receiverId:receiverId,message:message})
     await room.save();
    }
}
}
export default RoomService