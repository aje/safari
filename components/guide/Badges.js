import {Avatar, Card, Text} from "@nextui-org/react";
import Empty from "../Empty";

const Badges = ({data}) => {
    return (
        <Card className={"my-5"}>
            <Card.Header>
                <Text b>Badges ({data.length})</Text>
            </Card.Header>

            {data.length === 0 ? <Empty /> :
            <div className={"pl-5 pt-0"}>
                {data.map(({url}, index) => (
                    <Avatar
                        className={"mr-4 mb-2 inline-flex"}
                        squared
                        key={index}
                        size="lg"
                        src={url}
                        stacked
                    />
                ))}
            </div>}
        </Card>
    );
};

export default Badges;
