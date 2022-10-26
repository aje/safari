import nextConnect from 'next-connect';

const apiRoute = nextConnect({
    onError(error, req, res) {
        res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
    },
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
});

apiRoute.post(async (req, res) => {
    try {
        res.status(200).json({});
    } catch (err) {
        console.error(err)
    }
    res.end();
});


export const config = {
    api: {
        bodyParser: false, // Disallow body parsing, consume as stream
    },
};

export default apiRoute;