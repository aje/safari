import React, {useEffect, useState} from 'react';
import PageTitle from "../components/PageTitle";
import {Button, Image, Input, Loading, Text, Textarea} from "@nextui-org/react";
import {KeyboardArrowRight} from "@styled-icons/material-rounded/KeyboardArrowRight";
import axios from "../services/api"
import {useRouter} from "next/router";
import {toast} from "react-hot-toast";
import {Upload as UploadIcon} from "@styled-icons/entypo/Upload";
import {uploadFile} from "../services/clientUtils";

const Upload = () => {
    // const { data: session } = useSession();
    const router = useRouter();
    // console.log(session);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        date: "",
        // user: session?.user?._id
    });

    // useEffect(()=>{
    //     if(session)
    //         onChange("user")(session?.user?._id)
    // }, [session]);

    const onChange = name => event => {
        setFormData( {...formData, [name]: event?.target ? event.target.value: event });
    };

    const onSubmit = () => {
        setLoading(true);
        axios.post(`/posts`, formData).then(()=>{
            toast.success("Successfully created!");
            router.push('/trips')
        }).finally(() => setLoading(false))
    };

    const onUploadPic = async (e) => {
        const res = await uploadFile(e);
        onChange("gallery")(res.data?.files)
    }

    const disabled = formData.title === "" || formData.description === "" || formData.date === "";

    return (<>
        <PageTitle withBackButton title={"UPLOAD"}/>
        <div className={"flex relative flex-col z-10 p-8"} >
            <Input value={formData.title} onChange={onChange("title")} required size={"lg"} bordered className={"mb-5"} label={"Title *"} placeholder={"Choose a good title"}/>
            <Textarea value={formData.description} onChange={onChange("description")} required  rows={4} size={"lg"} bordered className={"mb-5"} label={"Description *"} placeholder={"Describe the trip with enthusiasm"} />

            <Input required value={formData.date} onChange={onChange("date")} size={"lg"} bordered className={"mb-5"} label={"Month of the trip *"} type="month"/>


            {formData.gallery?.length > 0 &&
                <div className=" mb-3">
                    <Text  className={"mb-2"}>Uploaded Gallery ({formData.gallery.length})</Text>
                    {formData.gallery.map(image => <Image
                onClick={()=>onChange("image")(null)}
                className={"inline-block w-16 h-16 mr-2 mb-1 rounded"}
                src={"/uploads/" + image.filename}
                layout="fill"
                objectFit="cover" />) }
                </div>
                    }

            <Button bordered size={"xl"} htmlFor={"upload"} as={"label"} className={"border border-dashed border-2 border-gray-400 text-gray-400"}  icon={<UploadIcon size={16}/>}>
                <input type="file" className={"hidden"} name="qualifications" multiple={true} id={"upload"}
                       onChange={onUploadPic}
                />
                Upload Gallery
            </Button>
            <div>
                <Button  disabled={loading || disabled} onPress={onSubmit} className={"mb-10 mt-3"}  iconRight={!loading && <KeyboardArrowRight size={20}/>}>
                    {loading ? <Loading type="points-opacity" color="currentColor" size="sm" /> :
                    "Publish" }
                </Button>
            </div>
        </div>
    </>);
};

export default Upload;
