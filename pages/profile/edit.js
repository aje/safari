import React, {useState} from 'react';
import PageTitle from "../../components/PageTitle";
import {Button, Checkbox, Input, Loading, Textarea} from "@nextui-org/react";
import {KeyboardArrowRight} from "@styled-icons/material-rounded/KeyboardArrowRight";
import axios from "../../services/api"
import {getSession, useSession} from "next-auth/react";
import {useRouter} from "next/router";
import {toast} from "react-hot-toast";
// import {unstable_getServerSession} from "next-auth/next";
// import {authOptions} from "../api/auth/[...nextauth]";
import * as models from "../../models/models";
import moment from "moment";

const UploadQualification = ({driver}) => {
    const { data: session } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState(driver ? {
        bio: driver?.bio,
        birthday: moment(driver?.birthday).format("YYYY-MM"),
        yearOfStart: moment(driver?.yearOfStart).format("YYYY-MM"),
    } : {
        bio: '',
        birthday:'',
        yearOfStart: '',
    });
    const [selected, setSelected] = React.useState(driver ? driver.languages : []);

    const onChange = name => event => {
        setFormData( {...formData, [name]: event?.target ? event.target.value: event });
    };

    const onSubmit = () => {
        setLoading(true);
        const req = driver ? axios.put(`/driver`, {...formData, languages: selected}) : axios.post(`/driver`, {...formData, languages: selected});
        req.then(()=>{
            if(driver)
                router.push("/profile")
            else {
                router.push("/profile/upload_qu?firstUser=true");
            }

            toast.success("Info successfully updated!");
        }).finally(() => setLoading(false))
    };

    return (<>
        <PageTitle withBackButton={driver} title={"Edit "}/>
        <div className={"flex relative flex-col z-10 p-8"} >
            <Textarea value={formData.bio} onChange={onChange("bio")} required  rows={4} size={"lg"} bordered className={"mb-5"} label={"bio *"} placeholder={"Describe yourself in couple sentences"} />
            <Input required value={formData.birthday} onChange={onChange("birthday")} size={"lg"} bordered className={"mb-5"} label={"Year of your birth is enough"} type="month"/>
            <Input required value={formData.yearOfStart} onChange={onChange("yearOfStart")} size={"lg"} bordered  label={"Year you started"} type="month"/>

            <Checkbox.Group
                label="Select cities"
                color="secondary"
                className={"mt-5"}
                size={'sm'}
                value={selected}
                onChange={setSelected}
            >
                <Checkbox value="english">English</Checkbox>
                <Checkbox value="friench">Friench</Checkbox>
                <Checkbox value="chinese">Chinese</Checkbox>
                <Checkbox value="others">Others</Checkbox>
            </Checkbox.Group>

            <div><Button  disabled={loading} onPress={onSubmit} className={"mb-20 mt-10"} size={'lg'} iconRight={!loading && <KeyboardArrowRight size={20}/>}>
                {loading ? <Loading type="points-opacity" color="currentColor" size="sm" /> :
                    "Save" }
            </Button></div>
        </div>
    </>);
};

export default UploadQualification;

export async function getServerSideProps({ req }) {
    const session = await getSession({ req });
    // const session = await unstable_getServerSession(context.req, context.res, authOptions);
    let driver = null;
    try {
        driver = await models.Driver.findOne({user: {_id: session?.user._id}})
    } catch (e) {
        console.log(e);
    }
    return {
        props: {driver: JSON.parse(JSON.stringify(driver)) },
    };
}