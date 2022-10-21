import React, {useState} from 'react';
import PageTitle from "../../components/PageTitle";
import {Button, Image, Input, Loading} from "@nextui-org/react";
import {KeyboardArrowRight} from "@styled-icons/material-rounded/KeyboardArrowRight";
import axios from "../../services/api"
import {useSession} from "next-auth/react";
import {useRouter} from "next/router";
import {toast} from "react-hot-toast";
import {uploadFile} from "../../services/clientUtils";
import {Upload} from "@styled-icons/entypo/Upload";

const UploadQualification = () => {
    const { data: session } = useSession();
    const router = useRouter();
    // console.log(session);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        image: null,
        // user: session?.user?._id
    });

    const onChange = name => event => {
        setFormData( {...formData, [name]: event?.target ? event.target.value: event });
    };

    const onSubmit = () => {
        setLoading(true);
        axios.post(`/qualification`, formData).then(()=>{
            router.push("/profile");
            toast.success("Qualification successfully uploaded!");
        }).finally(() => setLoading(false))
    };

    const onUploadPic = async (e) => {
        const res = await uploadFile(e);
        onChange("image")(res.data?.files?.[0])
        // console.log(res.data);
    }

    const disabled = formData.title === "" || !formData.image;

    return (<>
        <PageTitle withBackButton title={"UPLOAD QU"}/>
        <div className={"flex relative flex-col z-10 p-8"} >
            <Input value={formData.title} onChange={onChange("title")} required size={"lg"} bordered className={"mb-5"} label={"Title *"} placeholder={"Choose a good title"}/>
            {formData.image ? <Image
                onClick={()=>onChange("image")(null)}
                className={"border border-dashed border-2 border-gray-400 rounded"}
                src={"/uploads/" + formData.image.filename}
                layout="fill"
                objectFit="cover" /> : <Button bordered size={"xl"} as={"label"} className={"border border-dashed border-2 border-gray-400 text-gray-400"}  icon={<Upload size={16}/>}>
                <input type="file" className={"hidden"} name="qualifications" multiple={true} id={"upload"}
                       onChange={onUploadPic}
                />
                Upload Image
            </Button>}
           <div><Button  disabled={loading || disabled} onPress={onSubmit} className={"mb-10 mt-10"} size={'lg'} iconRight={!loading && <KeyboardArrowRight size={20}/>}>
                {loading ? <Loading type="points-opacity" color="currentColor" size="sm" /> :
                    "Publish" }
            </Button></div>
        </div>
    </>);
};

export default UploadQualification;
