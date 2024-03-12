import { Document, Schema } from 'mongoose';


export default interface Room extends Document {
    participants: Schema.Types.ObjectId[];
    messages: {
        senderId: Schema.Types.ObjectId;
        receiverId: Schema.Types.ObjectId;
        message: string;
    }[];
    createdAt: Date;
    updatedAt: Date;
}
