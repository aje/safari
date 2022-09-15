import {useEffect, useState} from 'react';
import {Card, Text} from "@nextui-org/react";
import ReviewItem from "../ReviewItem";

const Reviews = ({data}) => {
    return (<Card className={"my-5"}>
        <Card.Header>
            <Text b>Reviews ({data.length})</Text>
        </Card.Header>
        <Card.Body>
            {data.map((item ,i) => <ReviewItem  key={i} item={item}/>)}
        </Card.Body>
    </Card>);
};

export default Reviews;
