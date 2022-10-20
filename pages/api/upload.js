import nextConnect from 'next-connect';
import multer from 'multer';

const upload = multer({
    storage: multer.diskStorage({
        destination: './public/uploads',
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            cb(null,   uniqueSuffix + '-' + file.originalname)
        }
    }),
});

const apiRoute = nextConnect({
    onError(error, req, res) {
        res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
    },
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
});

apiRoute.use(upload.any());

apiRoute.post((req, res) => {

    // const file = req.file;
    // console.log(req.files);
    // console.log("apiRoute.post");
    res.status(200).json({data: "success", status: 200, files: req.files});
});


export const config = {
    api: {
        bodyParser: false, // Disallow body parsing, consume as stream
    },
};

export default apiRoute;