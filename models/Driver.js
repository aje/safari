import {model, models, Schema} from 'mongoose';
import {UserSchema} from "./User";

const QualificationSchema = new Schema({
    title: String,
    picture: String
});
const BadgesSchema = new Schema({
    title: String,
    picture: String
});
const AchievementSchema = new Schema({
    title: String,
    picture: String
});

const DriverSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    bio: String,
    birthday: Date,
    yearOfStart: Date,
    languages: {
        type: String,
        enum : ['ENGLISH','CHINESE', 'FRENCH', 'AFRICANS', 'DUTCH'],
    },
    badges: [BadgesSchema],
    achievements: [AchievementSchema],
    qualifications: [QualificationSchema],
    travelers: [UserSchema],
    ratingsQuantity: Number,
    ratingsAverage: Number,
    lastSignIn: {
        type: Date,
        default: Date.now()
    },
    xp: {type: Number, default: 0},
},{
    toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true } // So `console.log()` and other functions that use `toObject()` include virtuals
});


DriverSchema.virtual('reviews', {
    ref: 'Review',
    localField: 'user',
    foreignField: 'reviewee'
});

export const Driver  = models.Driver || model('Driver', DriverSchema);
export default Driver;
