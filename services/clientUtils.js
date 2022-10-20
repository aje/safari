import axios from "axios";
import {toast} from "react-hot-toast";

export const uploadFile = async (event) => {
    if (!event.target.files?.length) {
        return;
    }

    const formData = new FormData();

    Array.from(event.target.files).forEach((file) => {
        formData.append(event.target.name, file);
    });
    const config = {
        headers: {'content-type': 'multipart/form-data'},
        onUploadProgress: (event) => {
            console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
        },
        validateStatus: (status) => true,
    };
    const up = await axios.post('/api/upload', formData, config);
    if(up.status !== 200) {
        toast.error("Something is wrong");
    } else {
        toast.success("Uploaded!")
    }
    return up;
};