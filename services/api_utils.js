import Post from "../models/Post";
import User from "../models/User";

export  const  getTrips = async () => {
    return Post.find({})
        .populate({ path: 'user', model: User});
};
