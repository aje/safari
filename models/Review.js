import {model, models, Schema} from "mongoose";

export const ReviewSchema = new Schema({
    description: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    rating: Number,
    timestamp: Date
});

export default models.Review || model('Review', ReviewSchema);
