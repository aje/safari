import Post from "../../models/Post";
import dbConnect from "../../services/dbconnect";
import User from "../../models/User";
import {unstable_getServerSession} from "next-auth/next";
import {authOptions} from "./auth/[...nextauth]";

export default async function handler(req, res) {
    const { method } = req;
    const session = await unstable_getServerSession(req, res, authOptions)

    await dbConnect();

    switch (method) {
        case 'GET':
            try {
                const posts = await Post.find({})
                    .populate({ path: 'user', model: User});
                // const totalElements = await Post.count({});
                res.status(200).json({ success: true, data: posts});
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'POST':
            try {
                const data = await Post.create({...req.body, user: session.user });
                res.status(201).json({ success: true, data: data });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}
