import {Card, Text} from "@nextui-org/react";
import Moment from "react-moment";

const Info = ({driver}) => {
    return (
        <Card className={"my-5"}>
            <Card.Body>
                <Text h6>Bio</Text>
                <Text size={14}>{driver.bio}</Text>
                <Text h6 className={"mt-4"}>Language</Text>
                <Text  size={14} className={"capitalize"}>{driver.languages?.join(', ')}</Text>
                <Text h6 className={"mt-4"}>Age</Text>
                <Text  size={14}><Moment fromNow ago  >{driver.birthday}</Moment>  old</Text>
                <Text h6 className={"mt-4"}>Guiding experience</Text>
                <Text  size={14}><Moment fromNow ago  >{driver.yearOfStart}</Moment>  experience</Text>
            </Card.Body>
        </Card>);
};

export default Info;
