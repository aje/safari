import React, {useState} from 'react';
import {useRouter} from "next/router";
import {Button, Card, Dropdown, Text, User} from "@nextui-org/react"
import Moment from "react-moment";
import MyRating from "../../../components/MyRating";
import Reviews from "../../../components/guide/Reviews";
import ReviewForm from "../../../components/trip/ReviewForm";
import {ArrowBack} from "@styled-icons/material-rounded/ArrowBack";
import Post from "../../../models/Post"
import dbConnect from "../../../services/dbconnect";
import * as models from "../../../models/models";
import {monthFormat} from "../../../variables";
import Empty from "../../../components/Empty";
import {DotsThreeVertical} from "@styled-icons/entypo/DotsThreeVertical";
import {useSession} from "next-auth/react";

const  Trip = ({item}) => {
    const [selectedImage, setSelectedImage] = useState(0);
    const {data: session} = useSession();

    const router = useRouter();

    const onMoreMenu = (key) => {
        switch (key) {
            case "edit":
                router.push(`/upload?edit=${item._id}`)
                break;
            case "delete":
                break;
            default:
        }
    };

    const owner = session?.user?._id === item.user?._id;
    return (<div className={"pt-2 px-4 pb-28"}>
        <div className="flex items-center justify-between">
            <Button  onClick={() => router.back()} className={'text-gray-500 hover:bg-primary hover:text-white rounded-full h-10 w-10 p-0 -ml-2 mr-1'} light auto><ArrowBack size={26}/></Button>
            <div className="flex-grow">
                <User
                    className={"pl-0"}
                    size={"sm"}
                    src={item.user?.image}
                    name={item.user?.name}
                    description={<Moment format={monthFormat}>{item.timestamp}</Moment>}
                />
            </div>
            <Card className={"w-auto px-3 pb-1 rounded-full"}>
                <MyRating sm readonly value={item.ratingsAverage}
                          count={item.ratingsQuantity}
                />
            </Card>
            {owner &&
                <Dropdown>
                    <Dropdown.Trigger>
                        <Button
                            className={'text-gray-500 ml-2 hover:bg-primary hover:text-white rounded-full h-10 w-10 p-0'}
                            light auto><DotsThreeVertical size={20}/></Button></Dropdown.Trigger>
                    <Dropdown.Menu onAction={onMoreMenu} aria-label="Static Actions">
                        <Dropdown.Item key="edit">Edit</Dropdown.Item>
                        <Dropdown.Item key="logout" color="error">
                            Delete
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            }
        </div>
        {item.gallery.length === 0 ? <Card   className="my-4"><Empty label="No gallery! Please add pictures to publish"/></Card> :
            <>
        <Card  variant="flat" className="my-3">

            <Card.Image
                // height={350}
                showSkeleton
                width={"100%"}
                src={"/uploads/" + item.gallery?.[selectedImage].filename}
                objectFit="cover"
            />
        </Card>
        <div className="flex overflow-x-scroll">
            {item.gallery.map((image, i) =>
                <Card isPressable onClick={()=> setSelectedImage(i)} key={i} variant={"flat"}  className={"w-auto mr-3 flex-shrink-0"}>
                    <Card.Body css={{ p: 0 }}>
                        <Card.Image
                            src={"/uploads/" + image.filename}
                            objectFit="cover"
                            width={100}
                            height={100}
                            alt={image}
                        />
                    </Card.Body>
                </Card>
            )}
        </div>
        </>}

        {/*{item.travelers.length > 0 && <>*/}
        {/*    <Text h6 className={"mt-5"}>Travelers participated in this trip ({item.travelers?.length})</Text>*/}
        {/*    <div className="flex pb-3 overflow-x-scroll">*/}
        {/*        {item.travelers.map((traveler, i) => <Card key={i} variant={"bordered"}*/}
        {/*                                                   className={"w-auto mr-2 flex-shrink-0 rounded-full"}>*/}
        {/*            <User*/}
        {/*                className={"pl-0"}*/}
        {/*                size={"sm"}*/}
        {/*                src={traveler.user?.image}*/}
        {/*                name={traveler.user?.name}*/}
        {/*            />*/}
        {/*        </Card>)}*/}
        {/*    </div>*/}
        {/*</>}*/}
        <Card className={"mt-2"}>
            <Card.Header><Text h6>{item.title}</Text></Card.Header>
            <Card.Body className={"pt-0"}>{item.description}</Card.Body>
        </Card>

        <ReviewForm post={item}/>
        <Reviews data={item.reviews} total={item.ratingsQuantity}/>

    </div>);
};

export default Trip;

export async function getServerSideProps({ params }) {
    const {id} = params;
    await dbConnect();
    let item = null;
    try {
        item = await Post.findOne({ _id: id}).populate({ path: 'user', model: models.User})
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
