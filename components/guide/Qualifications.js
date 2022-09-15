import {useEffect, useState} from 'react';
import {Avatar, Card, Text} from "@nextui-org/react";

const Qualifications = ({data}) => {
    return (
        <Card className={"my-5"}>
            <Card.Header>
                <Text b>Qualifications ({data.length})</Text>
            </Card.Header>
            <div className={"mx-3"}>
                {data.map((item, i) => <div key={i} className="flex mb-3 items-center justify-between">
                    <Text>{item.name} </Text>
                    <Avatar squared src={item.url}/>
                </div>)}
            </div>
        </Card>
        );
};

export default Qualifications;
