import {Star} from "@styled-icons/material-rounded/Star"
import {StarBorderPurple500} from "@styled-icons/material-rounded/StarBorderPurple500"
import {Text} from "@nextui-org/react";
import Rating from "react-rating";
import React from "react";

const Rating2 = ({count, value, lg, sm, ...rest}) => {
    const color = "#FFC107";
    return (<div className={"flex-shrink-0"}>
        <Rating
            initialRating={value}
            {...rest}
            fullSymbol={<Star  size={lg ? 32 : sm ? 20 : 24} className={'-mr-1'} color={color}/>}
            emptySymbol={<StarBorderPurple500   size={lg ? 32 : sm ? 20 : 24} className={'-mr-1'} color={color}/>}
        />
        {(count || count === 0) && <Text span className={"ml-1 align-middle font-bold"} color={color}>({count})</Text>}
    </div>);
};

export default Rating2;
