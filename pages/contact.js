import React, {useState} from 'react';
import PageTitle from "../components/PageTitle";
import {Button, Input, Loading, Text, Textarea} from "@nextui-org/react";
import Link from "next/link";
import {KeyboardArrowRight} from "@styled-icons/material-rounded/KeyboardArrowRight";
import axios from "axios"

const Contact = () => {
    const [loading, setLoading] = useState(false);

    const onSubmit = () => {
        setLoading(true);
        axios.post(`/support`).then(()=>{

        }).finally(() => setLoading(false))
    };

    return (<>
        <PageTitle withBackButton title={"SUPPORT"}/>

        <div className={"flex relative flex-col z-10 p-8"} >

            <Input size={"lg"} bordered className={"mb-3"} label={"Subject"} />
            <Textarea  rows={4} size={"lg"} bordered className={"mb-6"} label={"Contact"}  />
            <div><Button auto disabled={loading} onPress={onSubmit} className={"mb-10"}  iconRight={!loading && <KeyboardArrowRight size={20}/>}>
                {loading ? <Loading type="points-opacity" color="currentColor" size="sm" /> :
                "Submit" }
            </Button></div>

            <Text h4>WHY SAFARIA?</Text>
            <Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium ad culpa dignissimos fuga harum labore maiores minus molestiae nisi officia quas qui quia quos rem soluta, ullam velit veritatis vero.</Text>

            <div className="flex mt-10 justify-around px-10">
                <Link href={"/"} className={"mr-5"}>Go Back Home</Link>
                -
                <Link href={"/signin"}>Login</Link>
            </div>
        </div>
    </>);
};

export default Contact;
