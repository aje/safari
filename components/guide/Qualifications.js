import {Avatar, Button, Card, Text} from "@nextui-org/react";
import Empty from "../Empty";
import {Upload} from "@styled-icons/entypo/Upload";
import axios from "axios";

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

    const uploadToClient = async (event) => {
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
        const response = await axios.post('/api/upload', formData, config);
        // console.log(response);
        // if (event.target.files && event.target.files[0]) {
        //     // const i = event.target.files[0];
        //     // setImage(i);
        //     // uploadToServer(event.target.files[0]).then(r => {
        //     //     console.log(r);
        //     // })
        //     // setCreateObjectURL(URL.createObjectURL(i));
        // }
    };
    // const onChange = async (formData) => {
    //     const response = await uploadFileRequest(formData, (event) => {
    //         console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
    //     });
    //
    //     console.log('response', response);
    // };


    return (
        <Card className={"my-5"}>
            <Card.Header>
                <Text b>Qualifications ({data.length})</Text>
            </Card.Header>
            <div className={"mx-3"}>
                {/*<img src={createObjectURL} />*/}
                {data.length === 0 ? <Empty noIcon extra={<Button size={"sm"} htmlFor={"upload"} as={"label"} icon={<Upload size={16}/>}>
                        <input type="file" className={"hidden"} name="theFiles" multiple={true} id={"upload"} onChange={uploadToClient} />
                        Upload
                </Button>}/>
                : data.map((item, i) => <div key={i} className="flex mb-3 items-center justify-between">
                    <Text>{item.name} </Text>
                    <Avatar squared src={item.url}/>
                </div>)}
            </div>
        </Card>
        );
};

export default Qualifications;
