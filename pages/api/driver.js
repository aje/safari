import nextConnect from "next-connect";
import dbConnect from "../../services/dbconnect";
import Driver from "../../models/Driver";
import {getSession} from "next-auth/react";

const apiRoute = nextConnect({
    onError(error, req, res) {
        res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
    },
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
});

apiRoute.put(async (req, res) => {
    const session = await getSession({ req });
    if (session) {
        // Signed in
        await dbConnect();

        const filter = { user: session.user };
        const update = req.body;

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
}).post(async (req, res) => {
    const session = await getSession({ req });
    // const session = await unstable_getServerSession(req, res, authOptions)
    if (session) {
        await dbConnect();
        const t = {...req.body, user: session.user};
        console.log(t);
        const data = await Driver.create(t);
        res.status(200).json({data});
    } else {
        res.status(401)
    }
    res.end()
})

export default apiRoute;