import React, {useEffect, useState} from 'react';
import PageTitle from "../components/PageTitle";
import {Button, Image, Input, Loading, Text, Textarea} from "@nextui-org/react";
import {KeyboardArrowRight} from "@styled-icons/material-rounded/KeyboardArrowRight";
import axios from "../services/api"
import {useRouter} from "next/router";
import {toast} from "react-hot-toast";
import {Upload as UploadIcon} from "@styled-icons/entypo/Upload";
import {uploadFile} from "../services/clientUtils";
import moment from "moment";
import dbConnect from "../services/dbconnect";
import Post from "../models/Post";
import * as models from "../models/models";
import {DeleteBin2} from "@styled-icons/remix-line/DeleteBin2";

const Upload = ({item}) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState(item ? {
        _id: item._id,
        title: item.title,
        description:  item.description,
        gallery:  item.gallery,
        date: moment(item?.date).format("YYYY-MM")
    } : {
        title: "",
        description: "",
        date: "",
        gallery: []
    });


    const onChange = name => event => {
        setFormData( {...formData, [name]: event?.target ? event.target.value: event });
    };

    const onSubmit = () => {
        setLoading(true);
        const req = item ? axios.put(`/posts`, formData) : axios.post(`/posts`, formData)
        req.then(()=>{
            toast.success("Successfully created!");
            router.push('/trips')
        }).finally(() => setLoading(false))
    };

    const onUploadPic = async (e) => {
        const res = await uploadFile(e);
        const t = formData.gallery ;
        if(res) onChange("gallery")([...res.data?.files, ...t])
    }

    const disabled = formData.title === "" || formData.description === "" || formData.date === "";

    const removeImage = (index) => e => {
        const t = [...formData.gallery];
        t.splice(index, 1);
        onChange("gallery")(t)
    }

    return (<>
        <PageTitle withBackButton title={"UPLOAD"}/>
        <div className={"flex relative flex-col z-10 p-8"} >
            <Input value={formData.title} onChange={onChange("title")} required size={"lg"} bordered className={"mb-5"} label={"Title *"} placeholder={"Choose a good title"}/>
            <Textarea value={formData.description} onChange={onChange("description")} required  rows={4} size={"lg"} bordered className={"mb-5"} label={"Description *"} placeholder={"Describe the trip with enthusiasm"} />

            <Input required value={formData.date} onChange={onChange("date")} size={"lg"} bordered className={"mb-5"} label={"Month of the trip *"} type="month"/>

            {formData.gallery?.length > 0 &&
                <div className=" mb-3">
                    <Text  className={"mb-2"}>Uploaded Gallery ({formData.gallery.length})</Text>
                    {formData.gallery.map((image, index) => <div key={index} className={"inline-block relative  mr-2 mb-1"}>
                        <Image
                            onClick={()=>onChange("image")(null)}
                            className={" w-16 h-16 rounded"}
                            src={"/uploads/" + image.filename}
                            layout="fill"
                            objectFit="cover" />
                        <button onClick={removeImage(index)} className={"absolute text-white bottom-0 border-none active:bg-red-700/70 right-0 w-full h-full bg-red-700/30 rounded"}>
                            <DeleteBin2 size={24} />
                        </button>
                    </div>) }
                </div>
                    }

            <Button bordered size={"xl"}  as={"label"} className={"border border-dashed border-2 border-gray-400 text-gray-400"}  icon={<UploadIcon size={16}/>}>
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


export async function getServerSideProps({query}) {
    const {edit} = query;
    await dbConnect();
    let item = null;
    try {
        item = await Post.findOne({ _id: edit}).populate({ path: 'user', model: models.User})
            .populate({ path: 'reviews', select: 'post author rating description createdAt', options: { sort: { 'createdAt': -1 } }});
        // console.log(item);
    } catch (e) {
        console.log(e);
    }
    return {
        props: {
            item: JSON.parse(JSON.stringify(item)),
        },
    };
}