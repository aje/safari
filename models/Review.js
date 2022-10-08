import {model, models, Schema} from "mongoose";
import * as myModels from "./models";

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

ReviewSchema.statics.calcAverageRatings = async function(postId, userId) {
    // console.log("[calcAverageRatings]",  userId);
    // this points to current model
    // console.log("[calcAverageRatings]");

    const statsDriver = await this.aggregate([
        {
            $match: { user: userId }
        },
        {
            $group: {
                _id: '$post',
                nRatings: { $sum: 1 },
                avgRating: { $avg: '$rating' }
            }
        }
    ]);

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
    await myModels.Post.findByIdAndUpdate(postId, {
        ratingsQuantity: stats[0].nRatings,
        ratingsAverage: stats[0].avgRating
    });
    //
    // console.log("[StatsDriver]", statsDriver);

    try {
        const t = await myModels.Driver.findOneAndUpdate({user: userId}, {
            ratingsQuantity: statsDriver[0].nRatings,
            ratingsAverage: statsDriver[0].avgRating
        });
        // console.log("[RESULT]",t);
    } catch (e) {
        console.log(e)
    }
};

ReviewSchema.pre(/^findOneAnd/, async function(next) {
    this.r = await this.findOne();
    // console.log(r);
    next();
});

ReviewSchema.post(/^findOneAnd/, async function(next) {
    await this.r.constructor.calcAverageRatings(this.r.post, this.r.user)
});

ReviewSchema.post('save', function() {
    console.log("[POST SAVE]",  this.post);
    this.constructor.calcAverageRatings(this.post, this.user);
});

ReviewSchema.post('create', function() {
    console.log("[POST create]", this.user);
    this.constructor.calcAverageRatings(this.post, this.user);
});


export const Review = models.Review || model('Review', ReviewSchema);
export default Review;
