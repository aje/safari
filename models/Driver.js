import mongoose, {model, models, Schema} from 'mongoose';
import {UserSchema} from "./User";
import Post from "./Post";

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
    Achievements: [AchievementSchema],
    qualifications: [QualificationSchema],
    travelers: [UserSchema],
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: "Review"
    }],
    xp: Number,
});

const Driver  = models.Driver || model('Driver', DriverSchema);
export default Driver;
