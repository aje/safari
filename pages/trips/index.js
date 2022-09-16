import React, {useEffect, useState} from 'react';
import PageTitle from "../../components/PageTitle";
import Link from "next/link";
import {Card} from "@nextui-org/react"

const Index = () => {
    return (<>
        <PageTitle title={"Trips"}/>
        <div className={"px-5 pt-10 pb-28"}>
        <Card>
            <Card.Body>
                <Link href={"/trips/trip/id"}>GO TO ID</Link>
            </Card.Body>
        </Card>
        </div>
        </>);
};

export default Index;
