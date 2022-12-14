import * as models from "../../models/models";
import dbConnect from "../../services/dbconnect";

export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case 'GET':
            // try {
            //     const posts = await Post.find({})
            //         .populate({ path: 'user', model: User});
            //     // const totalElements = await Post.count({});
            //     res.status(200).json({ success: true, data: posts});
            // } catch (error) {
            //     res.status(400).json({ success: false });
            // }
            break;
        case 'POST':
            try {
                const data = await models.Review.create(req.body);
                res.status(201).json({ success: true, data: data });
            } catch (error) {
                res.status(400).json({ success: false, error });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}
