import React, {useState} from 'react';
import {Card, Text, User} from "@nextui-org/react";
import Moment from "react-moment";
import Rating2 from "../Rating2";
import Link from "next/link";
import Empty from "../Empty";

const ListItem = ({item}) => {
    const [selectedImage, setSelectedImage] = useState(0);

    return (
        <Link href={`/trips/trip/${item._id}`}>
        <Card className="mb-5" isPressable >

            {item.gallery.length === 0 ? <><Empty label="No gallery! Please add pictures to publish"/><hr /></> :
            <Card.Image
                height={400}
                showSkeleton
                src={item.gallery[selectedImage]}
                objectFit="cover"
            />}

            <Card.Footer>
                <div className="flex-grow">
                    <User
                        className={"pl-0"}
                        src={item.user?.image}
                        name={item.user?.name}
                        description={<Moment format={"LL"}>{item.timestamp}</Moment>}
                    />
                </div>
                <Rating2 value={item.rating} sm readonly count={item.reviewsCount}/>

            </Card.Footer>

            <Card.Body className={"pt-0"}>
                <Text size={14}>{item.title}</Text>
            </Card.Body>
        </Card>
        </Link>
);
};

export default ListItem;
