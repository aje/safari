import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import {Card, User, Text, Input, Textarea, Loading, Button} from "@nextui-org/react"
import Moment from "react-moment";
import Rating2 from "../../../components/Rating2";
import Reviews from "../../../components/guide/Reviews";
import ReviewForm from "../../../components/trip/ReviewForm";

const  Trip = () => {
    const item ={
        rating: 5,
        title: "This was the great trip",
        description: "Lorem  ipsum docolor lorem    ",
        user: {
            image: "https://i.pravatar.cc/150?u=a04258114e29026702d",
            name: "Ariana Wattson",
        },
        gallery: [
            "https://api.lorem.space/image?w=500&h=500",
            "https://api.lorem.space/image/house?w=500",
            "https://api.lorem.space/image/car?w=500",
            "https://api.lorem.space/image/drink?w=500",
            "https://api.lorem.space/image/burger?w=500",
            "https://api.lorem.space/image?w=500",
        ],
        timestamp: 1663143033901,
        travelers: [
            {
                id: "sfd",
                user: {
                    image: "https://api.lorem.space/image/face?w=50",
                    name: "Hassan"
                }
            },
            {
                id: "sfd",
                user: {
                    image: "https://api.lorem.space/image/face?w=45",
                    name: "Behrouz"
                }
            },
            {
                id: "sfd",
                user: {
                    image: "https://api.lorem.space/image/face?w=40",
                    name: "Morteza"
                }
            },
            {
                id: "sfd",
                user: {
                    image: "https://api.lorem.space/image/face?w=50",
                    name: "Alen Coucher"
                }
            },
        ],
        reviews: [
            {
                user: {
                    image: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                    name: "Ariana Wattson",
                },
                rating: 2.5,
                description: "This trip was great and Lorem ipsum dolor sit ame obcaecati omnis placeat quam, quisquam, recusandae sit ullam!",
                timestamp: 1663143033901
            },
            {
                user: {
                    image: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
                    name: "Ariana Wattson Golabforoush",
                },
                rating: 5,
                description: "This trip was great and Lorem ipsum dolor sit ame obcaecati omnis placeat quam, quisquam, recusandae sit ullam!",
                images: [
                    "https://i.pravatar.cc/150?u=a042581f4e29026024d",
                    "https://i.pravatar.cc/150?u=a042581f4e29026704d",
                    "https://i.pravatar.cc/150?u=a04258114e29026702d",
                    "https://i.pravatar.cc/150?u=a048581f4e29026701d",
                ],
                timestamp: 1663143033901
            },
        ]
    };
    const [selectedImage, setSelectedImage] = useState(0);

    const router = useRouter();
    const { id } = router.query;
    return (<div className={"pt-2 px-4 pb-28"}>
        <div className="flex items-center justify-between">
            <div className="flex-grow">
                <User
                    className={"pl-0"}
                    size={"sm"}
                    src={item.user.image}
                    name={item.user.name}
                    description={<Moment format={"LL"}>{item.timestamp}</Moment>}
                />
            </div>
            <Card className={"w-auto px-3 pb-1 rounded-full"}><Rating2 value={item.rating} count={item.reviews.length}/></Card>
        </div>

        <Card  variant="flat" className="my-3">
            <Card.Image
                src={item.gallery[selectedImage]}
                objectFit="cover"
            />
        </Card>
        <div className="flex overflow-x-scroll">
            {item.gallery.map((image, i) =>
                <Card isPressable onClick={()=> setSelectedImage(i)} key={i} variant={"flat"}  className={"w-auto mr-3 flex-shrink-0"}>
                    <Card.Body css={{ p: 0 }}>
                        <Card.Image
                            src={image}
                            objectFit="cover"
                            width={100}
                            height={100}
                            alt={image}
                        />
                    </Card.Body>
                </Card>
            )}
        </div>

        <Text h6 className={"mt-5"}>Travelers participated in this trip</Text>
        <div className="flex pb-3 overflow-x-scroll">
            {item.travelers.map((traveler, i) =>  <Card key={i} variant={"bordered"} className={"w-auto mr-2 flex-shrink-0 rounded-full"}>
                <User
                    className={"pl-0"}
                    size={"sm"}
                    src={traveler.user.image}
                    name={traveler.user.name}
                />
            </Card>)}
        </div>
        <Card className={"mt-2"}>
            <Card.Header><Text h6>{item.title}</Text></Card.Header>
            <Card.Body className={"pt-0"}>{item.description}</Card.Body>
        </Card>

        <ReviewForm id={id}/>

            <Reviews data={item.reviews}/>

    </div>);
};

export default Trip;
