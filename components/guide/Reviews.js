import {Card, Text} from "@nextui-org/react";
import ReviewItem from "../ReviewItem";
import Empty from "../Empty";

const Reviews = ({data}) => {
    return (<Card className={"my-5"}>
        <Card.Header>
            <Text b>Reviews ({data.length})</Text>
        </Card.Header>
        <div className={"px-3"}>
            {data.length === 0 ? <Empty  /> :
            data.map((item ,i) => <ReviewItem  key={i} item={item}/>)}
        </div>
    </Card>);
};

export default Reviews;
