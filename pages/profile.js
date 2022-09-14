import {signIn, useSession, signOut} from "next-auth/react";
import {Button, Badge, Avatar, Container, styled, Text, useTheme, Progress} from "@nextui-org/react";
import {Verified} from "@styled-icons/material-rounded/Verified"
import { Loading } from '@nextui-org/react';
import { Edit } from '@styled-icons/remix-line/Edit';
import { Card } from '@nextui-org/react';
import Rating from "../components/Rating";
import {User} from "@nextui-org/react";
import Moment from "react-moment";
export default function Home() {
    const { data: session } = useSession();
    if(!session) return <Loading />;
    const {user}  = session;

    const pictureUsers = [
        "https://i.pravatar.cc/150?u=a042581f4e29026024d",
        "https://i.pravatar.cc/150?u=a042581f4e29026704d",
        "https://i.pravatar.cc/150?u=a04258114e29026702d",
        "https://i.pravatar.cc/150?u=a048581f4e29026701d",
    ];
    return (
        <div className={"px-5 pt-10 pb-28"}>
            <Badge
                content={<Verified color={"#79C2FB"} size={44}/>}
                color="white"

                horizontalOffset="2%"
                css={{ p: 0, border: 0 }}
                placement="bottom-right"
                // size="lg/?"
            >
            <Avatar className={"shadow-lg"}  squared src={user.image} css={{ size: "$20" }} text={user.name} />

            </Badge>
            <Text h2 className={"mt-2 mb-0 text-gray-600"}>{user.name}</Text>
            <Text >{user.bio || user.email}</Text>
            <div className="flex items-center justify-between">
                <Rating rating={3.4} count={44}/>
                <Button size={'xs'} icon={<Edit size={16} color={"gray"}/>} light auto>Edit Profile</Button>
            </div>

            <Card className={"my-3"} >
                <div className="px-4 flex justify-between items-end">
                    <div>
                        <Text span weight="bold" color={"primary"} size={60}>75</Text>
                        <Text span color={"gray"}>Lvl.</Text>
                    </div>
                    <span className={"mb-4"}><Text size={20} span weight={"bold"}>250SP</Text><Text span size={14}>/1500</Text></span>
                </div>
                <div className={"px-4 pb-4 -mt-2"}> <Progress color="primary" value={75} /></div>
            </Card>

            <Card className={"my-3"}>
                <Card.Body>
                    <Text h6>Bio</Text>
                    <Text size={14}>Jambo My Name is Antony I offer guiding services with a 4×4 jeep from wildlife tours, photography, documentaries, and cultural tours.I am ready to share my experience and skills gained to make a beautiful holiday with awesome memories for an African dream once the dream coming live.
                    </Text>
                    <Text h6 className={"mt-4"}>Language</Text>
                    <Text  size={14}>English, French, Chinese</Text>
                    <Text h6 className={"mt-4"}>Age</Text>
                    <Text  size={14}>56 Years old</Text>
                    <Text h6 className={"mt-4"}>Guiding experience</Text>
                    <Text   size={14}>20 years experience</Text>
                </Card.Body>
            </Card>

            <Card className={"my-3"}>
                <Card.Header>
                    <Text b>Badges (15)</Text>
                </Card.Header>
                <div className={"pl-5 pt-0"}>
                    {pictureUsers.map((url, index) => (
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

            <Card className={"my-3"}>
                <Card.Header>
                    <Text b>Travelers (155)</Text>
                </Card.Header>
                <div className={"pl-5 pb-3 pt-0"}>
                    <Avatar.Group count={150}>
                        {pictureUsers.map((url, index) => (
                            <Avatar
                                key={index}
                                size="lg"
                                pointer
                                src={url}

                                // color="gradient"
                                stacked
                            />
                        ))}
                    </Avatar.Group>

                </div>
            </Card>

            <Card className={"my-3"}>
                <Card.Header>
                    <Text b>Qualifications (15)</Text>
                </Card.Header>
                <Card.Body>
                    <div className="flex mb-3 items-center justify-between">
                        <Text>Certification of travelling </Text>
                        <Avatar squared src={"https://i.pravatar.cc/150?u=a048581f4e29026701d"}/>
                    </div><div className="flex items-center mb-3 justify-between">
                        <Text>Certification of travelling </Text>
                        <Avatar squared src={"https://i.pravatar.cc/150?u=a048581f4e29026701d"}/>
                    </div><div className="flex items-center justify-between">
                        <Text>Certification of travelling </Text>
                        <Avatar squared src={"https://i.pravatar.cc/150?u=a048581f4e29026701d"}/>
                    </div>
                </Card.Body>
            </Card>

            <Card className={"my-3"}>
                <Card.Header>
                    <Text b>Reviews (10)</Text>
                </Card.Header>
                <Card.Body>
                    <div className={"flex mb-2 justify-between items-center"}>
                        <User
                            className={"-ml-2"}
                            size={"sm"}
                            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                            name="Ariana Wattson"
                            description={<Moment format={"LL"}>{"1988-08-23"}</Moment>}
                        />
                        <Rating  rating={4} />
                    </div>
                    <Text className={"pl-10"}>This trip was great and Lorem ipsum dolor sit ame obcaecati omnis placeat quam, quisquam, recusandae sit ullam!</Text>
                    <div className={"pl-12 pt-3"}>
                        {pictureUsers.map((url, index) => (
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
                </Card.Body>
            </Card>
        </div>
    )
}
