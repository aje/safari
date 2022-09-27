import mongoose, {Schema} from "mongoose";

export const PostSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: {
        type: Date,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    gallery: [String],
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review"
    }],
    travelers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
});
const Post  = mongoose.models.Post ||  mongoose.model('Post', PostSchema);
export default Post;
