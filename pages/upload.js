import React, {useEffect, useState} from 'react';
import PageTitle from "../components/PageTitle";
import {Button, Input, Loading, Textarea} from "@nextui-org/react";
import {KeyboardArrowRight} from "@styled-icons/material-rounded/KeyboardArrowRight";
import axios from "../services/api"
import {useSession} from "next-auth/react";

const Upload = () => {
    const { data: session } = useSession();
    console.log(session);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        date: "",
        user: session?.user?._id
    });

    useEffect(()=>{
        if(session)
            onChange("user")(session.user?._id)
    }, [session]);

    const onChange = name => event => {
        setFormData( {...formData, [name]: event?.target ? event.target.value: event });
    };

    const onSubmit = () => {
        setLoading(true);
        axios.post(`/posts`, formData).then(()=>{

        }).finally(() => setLoading(false))
    };

    return (<>
        <PageTitle withBackButton title={"UPLOAD"}/>
        <div className={"flex relative flex-col z-10 p-8"} >
            <Input value={formData.title} onChange={onChange("title")} required size={"lg"} bordered className={"mb-3"} label={"Title *"} placeholder={"Choose a good title"}/>
            <Textarea value={formData.description} onChange={onChange("description")} required  rows={4} size={"lg"} bordered className={"mb-3"} label={"Description *"} placeholder={"Describe the trip with enthusiasm"} />

            <Input required value={formData.date} onChange={onChange("date")} size={"lg"} bordered className={"mb-3"} label={"Month of the trip *"} type="month"/>
            <div><Button auto disabled={loading} onPress={onSubmit} className={"mb-10 mt-3"}  iconRight={!loading && <KeyboardArrowRight size={20}/>}>
                {loading ? <Loading type="points-opacity" color="currentColor" size="sm" /> :
                "Publish" }
            </Button></div>
        </div>
    </>);
};

export default Upload;
