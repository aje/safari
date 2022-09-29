import {Avatar, Card, Text} from "@nextui-org/react";
import Empty from "../Empty";

const Travelers = ({data}) => {
    return (<Card className={"my-4"}>
        <Card.Header>
            <Text b>Travelers ({data.length})</Text>
        </Card.Header>

        {data.length === 0 ? <Empty /> :
        <div className={"pl-5 pb-3 pt-0"}>
            <Avatar.Group count={data.length - 6}>
                {data.map(({user}, index) => index < 6 && (
                    <Avatar
                        key={index}
                        size="lg"
                        pointer
                        src={user.image}

                        // color="gradient"
                        stacked
                    />
                ))}
            </Avatar.Group>
        </div>}
    </Card>);
};

export default Travelers;
