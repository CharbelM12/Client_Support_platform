import { Schema, model} from 'mongoose';
import {category} from "./category.interface";
import config from '../configs/config';

const categorySchema = new Schema({
    name: String,
    description: String,
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: config.collections.userCollection,
    },
    updatedBy: {
        type: Schema.Types.ObjectId,
        ref: config.collections.userCollection,
    }
}, { timestamps: config.timestamps.timestampsValue });
categorySchema.index({ createdBy: 1 });
categorySchema.index({ updatedBy: 1 });
const categoryModel = model<category>(config.collections.categoryCollection, categorySchema);
export default categoryModel;
