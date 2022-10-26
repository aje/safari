import axios from "axios";
import {toast} from "react-hot-toast";

export const uploadFile = async (event) => {
    if (!event.target.files?.length) {
        return ;
    }

    const formData = new FormData();

    Array.from(event.target.files).forEach((file) => {
        formData.append(event.target.name, file);
    });
    // formData.append("params", auth: { key: '56a8aa05db5e4f64bef1652cb5a43358' })
    const config = {
        headers: {'content-type': 'multipart/form-data'},
        onUploadProgress: (event) => {
            console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
        },
        validateStatus: (status) => true,
    };
    // const up = await axios.post('/api/upload', formData, config);
    const up = await axios.post('https://www.googleapis.com/upload/drive/v3/files?uploadType=media', formData, config);
    if(up.status !== 200) {
        toast.error("Something is wrong");
    } else {
        toast.success("File uploaded!")
    }
    return up;
};