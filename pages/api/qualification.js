import nextConnect from "next-connect";
import dbConnect from "../../services/dbconnect";
import {unstable_getServerSession} from "next-auth/next";
import {authOptions} from "./auth/[...nextauth]";
import Driver from "../../models/Driver";

const apiRoute = nextConnect({
    onError(error, req, res) {
        res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
    },
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
});

apiRoute.post(async (req, res) => {

    const session = await unstable_getServerSession(req, res, authOptions)
    // const file = req.file;
    // findOneAndUpdate
    if (session) {
        // Signed in
        await dbConnect();

        const filter = { user: session.user };
        const update = { $push: {
                qualifications: req.body,
            },};
        const d = await Driver.findOneAndUpdate(
            filter,
            update,
        );
        res.status(200).json({data: d});
    } else {
        // Not Signed in
        res.status(401)
    }
    res.end()
    // res.status(200).json({data: "success"});
    // console.log("apiRoute.post");
});

export default apiRoute;