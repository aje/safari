import React, {useState} from 'react';
import {Button, Card, Loading, Textarea} from "@nextui-org/react";
import {KeyboardArrowRight} from "@styled-icons/material-rounded/KeyboardArrowRight";
import axios from "axios";
import Rating2 from "../Rating2";

const ReviewForm = ({id}) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        description: "",
        rating: 0,
    });

    const onChange = name => event => {
        setFormData( {...formData, [name]: event?.target ? event.target.value: event });
    };

    const onSubmit = () => {
        setLoading(true);
        const data = {...formData, id};
        axios.post(`/reviewTrip`, data).then(()=>{

        }).finally(() => setLoading(false))
    };

    return (<Card className={"mt-5 px-4 py-3"}>
        {/*<Card.Header><Text h6>Review</Text></Card.Header>*/}

        <Textarea required  rows={4} size={"lg"} bordered className={"mb-3"} label={"Review"} placeholder={"You can only review if you have been in this trip"} />

        <div className="flex justify-between items-center">
            <Rating2
                lg
                value={formData.rating}
                onChange={onChange("rating")}
            />
            <Button auto disabled={loading} onPress={onSubmit}  iconRight={!loading && <KeyboardArrowRight size={20}/>}>
                {loading ? <Loading type="points-opacity" color="currentColor" size="sm" /> :
                    "Submit" }
            </Button>
        </div>
    </Card>);
};

export default ReviewForm;
