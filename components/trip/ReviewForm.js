import React, {useState} from 'react';
import {Button, Card, Loading, Textarea} from "@nextui-org/react";
import {KeyboardArrowRight} from "@styled-icons/material-rounded/KeyboardArrowRight";
import axios from "axios";
import MyRating from "../MyRating";
import {toast} from "react-hot-toast";
import {useSession} from "next-auth/react";
import {useRouter} from "next/router";

const ReviewForm = ({post}) => {
    const { data: session } = useSession();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        description: "",
        rating: 0,
        post: post.id,
    });

    const router = useRouter();

    const onChange = name => event => {
        setFormData( {...formData, [name]: event?.target ? event.target.value: event });
    };

    const onSubmit = () => {
        console.log(post);

        setLoading(true);
        const data = {...formData, author: session?.user?._id, reviewee: post.user._id};
        axios.post(`/api/reviews`, data).then(()=>{
            router.replace(router.asPath);
            toast.success("Successfully posted!");
        }).finally(() => setLoading(false))
    };

    return (<Card className={"mt-5 px-4 py-3"}>
        {/*<Card.Header><Text h6>Review</Text></Card.Header>*/}

        <Textarea required onChange={onChange("description")} value={formData.description}  rows={4} size={"lg"} bordered className={"mb-4"} label={"Review"} placeholder={"You can only review if you have been in this trip"} />

        <div className="">
            <MyRating
                className={"mb-4 "}
                lg
                value={formData.rating}
                onChange={onChange("rating")}
            />
            <Button auto disabled={loading || formData.description === "" || formData.rating === 0} onPress={onSubmit}  iconRight={!loading && <KeyboardArrowRight size={20}/>}>
                {loading ? <Loading type="points-opacity" color="currentColor" size="sm" /> :
                    "Post" }
            </Button>
        </div>
    </Card>);
};

export default ReviewForm;
