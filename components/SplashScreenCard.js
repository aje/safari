import React from 'react';
import {Card, Text} from "@nextui-org/react";
import clsx from "clsx";

const SplashScreenCard = ({image, color, title, subtitle}) => {
    return (
        <div className={"flex z-10 flex-col flex-grow bg-transparent text-center p-4"}>
            <Card  variant="flat" className="mb-3">
                <Card.Image
                    src={image}
                    objectFit="cover"
                />
            </Card>
            <div className={"p-4 flex flex-col"}>
                <Text h2 className={clsx("font-normal font-mono", color)} >{title}</Text>
                <Text h4 className={"font-normal"}>{subtitle}</Text>
            </div>
        </div>
    );
};

export default SplashScreenCard;
