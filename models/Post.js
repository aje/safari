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
    ratingsQuantity: Number,
    ratingsAverage: Number,
    travelers: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
},{
    toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true } // So `console.log()` and other functions that use `toObject()` include virtuals
});

PostSchema.virtual('reviews', {
    ref: 'Review',
    localField: '_id',
    foreignField: 'post'
});

export const Post  = mongoose.models.Post ||  mongoose.model('Post', PostSchema);
export default Post;
