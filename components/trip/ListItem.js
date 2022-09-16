import React, {useEffect, useState} from 'react';
import {Card, User} from "@nextui-org/react";
import Moment from "react-moment";
import Rating2 from "../Rating2";

const ListItem = ({item}) => {
    const [selectedImage, setSelectedImage] = useState(0);

    return (<>
        <Card  variant="flat" className="my-3">
            <Card.Image
                src={item.gallery[selectedImage]}
                objectFit="cover"
            />
        </Card>
        <Card>
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
                <Rating2 value={item.rating} count={item.reviews.length}/>
            </div>
        </Card>
        </>);
};

export default ListItem;
