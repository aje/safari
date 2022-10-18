import {Avatar, Text, User} from "@nextui-org/react";
import Moment from "react-moment";
import MyRating from "./MyRating";

const ReviewItem = ({item}) => {
    return (<div className={"mb-5"}>
        <div className={"flex mb-2 justify-between items-center"}>
            <User
                className={"pl-0"}
                size={"sm"}
                src={item.author.image}
                name={item.author.name}
                description={<Moment format={"LL"}>{item.timestamp}</Moment>}
            />
            <MyRating sm value={item.rating} readonly/>
        </div>
        <Text className={"pl-10"}>{item.description}</Text>
        <div className={"pl-12 pt-3"}>
            {item.images?.map((url, index) => (
                <Avatar
                    className={"mr-4 mb-2 inline-flex"}
                    squared
                    key={index}
                    size="sm"
                    src={url}
                    stacked
                />
            ))}
        </div>
        </div>);
};

export default ReviewItem;
