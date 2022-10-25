import React, {useState} from 'react';
import {Button, Card, Loading, Textarea} from "@nextui-org/react";
import {KeyboardArrowRight} from "@styled-icons/material-rounded/KeyboardArrowRight";
import axios from "axios";
import MyRating from "../MyRating";
import {toast} from "react-hot-toast";
import {useSession} from "next-auth/react";
import {useRouter} from "next/router";
import {Login} from "@styled-icons/entypo";

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
        // console.log(post);

        setLoading(true);
        const data = {...formData, author: session?.user?._id, reviewee: post.user._id};
        axios.post(`/api/reviews`, data).then(()=>{
            router.replace(router.asPath);
            toast.success("Successfully posted!");
        }).finally(() => setLoading(false))
    };

    return (<Card className={"mt-5 px-4 py-3"}>
        <Textarea required disabled={!session} onChange={onChange("description")} value={formData.description}  rows={4} size={"lg"} bordered className={"mb-4"} label={"Review"} placeholder={"You can only review if you have been in this trip"} />
        <div>
            <MyRating
                readonly={!session}
                className={"mb-4"}
                lg
                value={formData.rating}
                onChange={onChange("rating")}
            />

            {session ?
                <Button disabled={loading || formData.description === "" || formData.rating === 0} onPress={onSubmit}
                        iconRight={!loading && <KeyboardArrowRight size={20}/>}>
                    {loading ? <Loading type="points-opacity" color="currentColor" size="sm"/> :
                        "Post"}
                </Button>
                :
                <Button color={"secondary"} onPress={()=>router.push('/login')} icon={<Login size={24} />}>Login first</Button>
            }
        </div>
    </Card>);
};

export default ReviewForm;
