import {  Schema, model, Types } from 'mongoose';
import {complaint}  from './complaint.interface';
import complaintConfig from './complaint.config';
import config from "../configs/config"

const complaintSchema = new Schema({
    title: String,
    body: String,
    categoryIds: [{
        type: Schema.Types.ObjectId,
        ref: config.collections.categoryCollection
    }],
    status: {
        type: String,
        enum: [complaintConfig.complaintStatus.pending, complaintConfig.complaintStatus.inProgress, complaintConfig.complaintStatus.resolved, complaintConfig.complaintStatus.rejected],
        default: complaintConfig.complaintStatus.pending
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: config.collections.userCollection,
    }
}, { timestamps: config.timestamps.timestampsValue });
complaintSchema.index({ categoryIds: 1 });
complaintSchema.index({ status: 1 });
complaintSchema.index({ createdBy: 1 });

const complaintModel=model<complaint>(config.collections.complaintCollection, complaintSchema);

export default complaintModel;

