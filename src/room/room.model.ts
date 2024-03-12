import { Schema, model} from 'mongoose';
import Room from "./room.interface";
import config from '../configs/config';

const roomSchema = new Schema({
    participanst: [
        {
            type:Schema.ObjectId,
            ref:config.collections.userCollection
        }
    ],
    messages: [
        {
            senderId:{
                type:Schema.ObjectId,
                ref:config.collections.userCollection
            },
            receiverId:{
                type:Schema.ObjectId,
                ref:config.collections.userCollection
            },
            message:String,
        }
    ],
  
}, { timestamps: config.timestamps.timestampsValue });

const roomModel = model<Room>(config.collections.roomCollection, roomSchema);
export default roomModel;