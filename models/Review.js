import {model, models, Schema} from "mongoose";
import Post from "./Post";

export const ReviewSchema = new Schema({
    description: {
        type: String,
        required: [true, 'Review cannot be empty!']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, 'Review must have an author']
    },
    rating: {
        type: Number,
        min: [1, 'Rating cannot be below 1.0'],
        max: [5, 'Rating cannot be above 5.0']
    },
    post: {
        type: Schema.ObjectId,
        ref: 'Post',
        required: [true, 'Review must belong to a post']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

ReviewSchema.statics.calcAverageRatings = async function(postId) {
    // this points to current model
    // console.log("[calcAverageRatings]");

    const stats = await this.aggregate([
        {
            $match: { post: postId }
        },
        {
            $group: {
                _id: '$post',
                nRatings: { $sum: 1 },
                avgRating: { $avg: '$rating' }
            }
        }
    ]);

    await Post.findByIdAndUpdate(postId, {
        ratingsQuantity: stats[0].nRatings,
        ratingsAverage: stats[0].avgRating
    });
    // console.log(stats);
};

ReviewSchema.pre(/^findOneAnd/, async function(next) {
    this.r = await this.findOne();
    // console.log(r);
    next();
});

ReviewSchema.post(/^findOneAnd/, async function(next) {
    await this.r.constructor.calcAverageRatings(this.r.post)
});

ReviewSchema.post('save', function() {
    // console.log("[POST SAVE]");
    this.constructor.calcAverageRatings(this.post);
});

ReviewSchema.post('create', function() {
    // console.log("[POST create]");
    this.constructor.calcAverageRatings(this.post);
});


export const Review = models.Review || model('Review', ReviewSchema);
export default Review;
