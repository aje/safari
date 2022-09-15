import {Avatar, Card, Progress, Text} from "@nextui-org/react";

const Achievements = ({data}) => {
    return (<>
        <Card className={"my-4"}>
            <Card.Header>
                <Text b>Achievements ({data.length})</Text>
            </Card.Header>

            <div className={"mx-3"}>
                {data.map((item, i) => <div key={i} className="flex items-center mb-3">
                    <Avatar  src={item.image}/>
                    <div className="ml-2 flex-grow">
                        <Text b size={14} className={"-mb-1 block"}>{item.name} </Text>
                        <div className="flex justify-between">
                            <Text size={12}>{item.current}/{item.max} {item.action} </Text>
                            <Text size={12}>{parseInt((item.current*100)/item.max)}%</Text>
                        </div>
                        <Progress  size="sm" color="primary" value={parseInt((item.current * 100)/item.max)} />
                    </div>
                </div>)}
            </div>
        </Card>
        </>);
};

export default Achievements;
