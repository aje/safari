import {Avatar, Card, Text} from "@nextui-org/react";

const Badges = ({badges}) => {
    return (
        <Card className={"my-5"}>
            <Card.Header>
                <Text b>Badges ({badges.length})</Text>
            </Card.Header>

            <div className={"pl-5 pt-0"}>
                {badges.map(({url}, index) => (
                    <Avatar
                        className={"mr-4 mb-2 inline-flex"}
                        squared
                        key={index}
                        size="lg"
                        src={url}
                        stacked
                    />
                ))}
            </div>
        </Card>
    );
};

export default Badges;
