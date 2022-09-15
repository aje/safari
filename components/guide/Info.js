import {useEffect, useState} from 'react';
import {Card, Text} from "@nextui-org/react";

const Info = ({data}) => {
    return (
        <Card className={"my-5"}>
            <Card.Body>
                <Text h6>Bio</Text>
                <Text size={14}>{data.bio}</Text>
                <Text h6 className={"mt-4"}>Language</Text>
                <Text  size={14}>{data.languages}</Text>
                <Text h6 className={"mt-4"}>Age</Text>
                <Text  size={14}>{data.age} Years old</Text>
                <Text h6 className={"mt-4"}>Guiding experience</Text>
                <Text   size={14}>{data.experience} years experience</Text>
            </Card.Body>
        </Card>);
};

export default Info;
