import mongoose, {Schema} from "mongoose";

export const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    gallery: [String],
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: "Review"
    }],
    travelers: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
});
const Post  = mongoose.models.Post ||  mongoose.model('Post', PostSchema);
export default Post;
