import Post from "../models/Post";
import User from "../models/User";
import dbConnect from "./dbconnect";

export  const  getTrips = async () => {
    await dbConnect();
    return Post.find({})
        .populate({ path: 'user', model: User});
};

