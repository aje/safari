import {useEffect, useState} from 'react';
import {Star} from "@styled-icons/material-rounded/Star"
import {StarHalf} from "@styled-icons/material-rounded/StarHalf"
import {StarBorderPurple500} from "@styled-icons/material-rounded/StarBorderPurple500"
import {Text} from "@nextui-org/react";

const Rating = ({count, rating}) => {

    return (<div className={"flex-shrink-0"}>
        <Star className={"-ml-2"} size={24} color={"#FFC107"}/>
        <Star className={"-ml-2"} size={24} color={"#FFC107"}/>
        <Star className={"-ml-2"} size={24} color={"#FFC107"}/>
        <StarHalf className={"-ml-2"} size={24} color={"#FFC107"}/>
        <StarBorderPurple500 className={"-ml-2"} size={24} color={"#FFC107"}/>
        {count && <Text span className={"ml-1 align-middle font-bold"} color={"#ecb007"}>({count})</Text>}
    </div>);
};

export default Rating;
