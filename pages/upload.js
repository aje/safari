import React, {useEffect, useState} from 'react';
import PageTitle from "../components/PageTitle";
import {Text, Button, Input, Textarea, Loading} from "@nextui-org/react";
import Link from "next/link";
import {KeyboardArrowRight} from "@styled-icons/material-rounded/KeyboardArrowRight";
import axios from "axios"

const Contact = () => {
    const [loading, setLoading] = useState(false);

    const onSubmit = () => {
        setLoading(true);
        axios.post(`/uploadTrip`).then(()=>{

        }).finally(() => setLoading(false))
    };

    return (<>
        <PageTitle title={"UPLOAD"}/>
        <div className={"flex relative flex-col z-10 p-8"} >
            <Input required size={"lg"} bordered className={"mb-3"} label={"Title *"} placeholder={"Choose a good title"}/>
            <Textarea required  rows={4} size={"lg"} bordered className={"mb-3"} label={"Description *"} placeholder={"Describe the trip with enthusiasm"} />

            <Input required size={"lg"} bordered className={"mb-3"} label={"Month of the trip *"} type="month"/>
            <div><Button auto disabled={loading} onPress={onSubmit} className={"mb-10 mt-3"}  iconRight={!loading && <KeyboardArrowRight size={20}/>}>
                {loading ? <Loading type="points-opacity" color="currentColor" size="sm" /> :
                "Publish" }
            </Button></div>
        </div>
    </>);
};

export default Contact;
