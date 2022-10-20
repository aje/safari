import {Avatar, Button, Card, Text} from "@nextui-org/react";
import Empty from "../Empty";
import {Upload} from "@styled-icons/entypo/Upload";
import axios from "axios";
import {uploadFile} from "../../services/clientUtils";
import Link from "next/link";
import {useRouter} from "next/router";
// import {uploadFile} from "../../services/api_utils";

const Qualifications = ({data}) => {
    // const [image, setImage] = useState(null);
    // const [createObjectURL, setCreateObjectURL] = useState(null);

    // const uploadToServer = async (event) => {
    //     const formData  = new FormData();
    //     Array.from(event.target.files).forEach((file) => {
    //         formData.append(event.target.name, file);
    //     });
    //     body.append("file", image);
    //     const config = {
    //         headers: { 'content-type': 'multipart/form-data' },
    //         onUploadProgress: (event) => {
    //             console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
    //         },
    //     };
    //     const response = await axios.post('/api/upload', body, config);
    //     // const response = await fetch("/api/file", {
    //     //     method: "POST",
    //     //     body
    //     // });
    // };
    // const onChange = async (formData) => {
    //     const response = await uploadFileRequest(formData, (event) => {
    //         console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
    //     });
    //
    //     console.log('response', response);
    // };
    const router = useRouter();


    return (
        <Card className={"my-5"}>
            <Card.Header>
                <Text b>Qualifications ({data.length})</Text>
            </Card.Header>
            <div className={"mx-3"}>
                {/*<img src={createObjectURL} />*/}
                {data.length === 0 ? <Empty
                        noIcon
                        extra={<Button size={"sm"} auto icon={ <Upload size={16}/>} onPress={()=>router.push("/upload_qu")}>
                            Upload Qualification
                            </Button>}/>
                : data.map((item, i) => <div key={i} className="flex mb-3 items-center justify-between">
                    <Text>{item.title} </Text>
                    <Avatar squared src={"/uploads/"+item.image.filename}/>
                </div>)}
            </div>
        </Card>
        );
};

export default Qualifications;
