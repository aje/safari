import {Card, Text} from "@nextui-org/react";
import ReviewItem from "../ReviewItem";
import Empty from "../Empty";

const Reviews = ({data, total}) => {
    return (<Card className={"my-5"}>
        <Card.Header>
            <Text b>Reviews {total && `(${total})`}</Text>
        </Card.Header>

        <div className={"px-3"}>
            {!total ? <Empty  /> :
            data?.map((item ,i) => <ReviewItem  key={i} item={item}/>)}
        </div>
    </Card>);
};

export default Reviews;
