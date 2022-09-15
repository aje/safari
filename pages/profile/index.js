import {signIn, useSession, signOut} from "next-auth/react";
import {Button,Dropdown, Badge, Avatar, Container, styled, Text, useTheme, Progress} from "@nextui-org/react";
import {Verified} from "@styled-icons/material-rounded/Verified"

import { Edit } from '@styled-icons/remix-line/Edit';
import { Card } from '@nextui-org/react';
import Rating from "../../components/Rating";
import ReviewItem from "../../components/ReviewItem";
import {MoreVert} from "@styled-icons/material-rounded/MoreVert";
import LoadingPage from "../../components/LoadingPage";


export default function Home() {
    const { data: session } = useSession();
    if(!session) return <LoadingPage />;
    const {user}  = session;

    const pictureUsers = [
        "https://i.pravatar.cc/150?u=a042581f4e29026024d",
        "https://i.pravatar.cc/150?u=a042581f4e29026704d",
        "https://i.pravatar.cc/150?u=a04258114e29026702d",
        "https://i.pravatar.cc/150?u=a048581f4e29026701d",
    ];

    const reviews = [
        {
            user: {
                image: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                name: "Ariana Wattson",
            },
            rating: 2.5,
            description: "This trip was great and Lorem ipsum dolor sit ame obcaecati omnis placeat quam, quisquam, recusandae sit ullam!",
            timestamp: 1663143033901
        },
        {
            user: {
                image: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
                name: "Ariana Wattson Golabforoush",
            },
            rating: 5,
            description: "This trip was great and Lorem ipsum dolor sit ame obcaecati omnis placeat quam, quisquam, recusandae sit ullam!",
            images: pictureUsers,
            timestamp: 1663143033901
        },
    ];

    const badges = [
        {url: "https://i.pravatar.cc/150?u=a048581f4e29026701d", name: "this badge"},
        {url: "https://i.pravatar.cc/150?u=a042581f4e29026704d", name: "this badge"},
        {url: "https://i.pravatar.cc/150?u=a04258114e29026702d", name: "this badge"},
        {url: "https://i.pravatar.cc/150?u=a048581f4e29026701d", name: "this badge"},
    ];

    const qualifications = [
        {url: "https://i.pravatar.cc/150?u=a048581f4e29026701d", name: "Certification of Traveling"},
        {url: "https://i.pravatar.cc/150?u=a042581f4e29026704d", name: "Traveling certificate"},
        {url: "https://i.pravatar.cc/150?u=a04258114e29026702d", name: "Tourism Licence"},
    ];

    const travelers = [
        {
            id: "i",
            user: {
                image: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
                name: "Ariana Wattson Golabforoush",
            },
        },
        {
            id: "is",
            user: {
                image: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
                name: "Ariana Wattson Golabforoush",
            },
        },
        {
            id: "i",
            user: {
                image: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
                name: "Ariana Wattson Golabforoush",
            },
        },
        {
            id: "is",
            user: {
                image: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
                name: "Ariana Wattson Golabforoush",
            },
        },
        {
            id: "ia",
            user: {
                image: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                name: "Ariana Wattson Golabforoush",
            },
        },
        {
            id: "if",
            user: {
                image: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
                name: "Ariana Wattson Golabforoush",
            },
        },
        {
            id: "is",
            user: {
                image: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
                name: "Ariana Wattson Golabforoush",
            },
        },
        {
            id: "ia",
            user: {
                image: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                name: "Ariana Wattson Golabforoush",
            },
        },
        {
            id: "if",
            user: {
                image: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
                name: "Ariana Wattson Golabforoush",
            },
        },
    ];

    const onMoreMenu = (key) => {
        switch (key) {
            case "upload":

                break;
            case "edit":

                break;
            case "logout":
                signOut().then(r => console.log(r));
                break;
            default:

        }
    };

    return (
        <div className={"px-5 pt-10 pb-28"}>
            <Badge
                content={<Verified color={"#79C2FB"} size={40}/>}
                color="transparent"

                horizontalOffset="5%"
                verticalOffset="5%"
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
                <div className={"flex"}>
                    {/*<Button size={'xs'} icon={<Edit size={16} color={"gray"}/>} light auto></Button>*/}
                    <Dropdown>
                        <Dropdown.Trigger><Button size={'xs'} light auto><MoreVert size={20} color={"gray"}/></Button></Dropdown.Trigger>
                        <Dropdown.Menu  onAction={onMoreMenu} aria-label="Static Actions">
                            <Dropdown.Item key="upload">Upload qualifications</Dropdown.Item>
                            <Dropdown.Item key="edit">Edit profile</Dropdown.Item>
                            <Dropdown.Item key="logout" color="error">
                                Logout
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
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

            <Card className={"my-3"}>
                <Card.Header>
                    <Text b>Travelers ({travelers.length})</Text>
                </Card.Header>
                <div className={"pl-5 pb-3 pt-0"}>
                    <Avatar.Group count={travelers.length - 6}>
                        {travelers.map(({user}, index) => index < 6 && (
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

                </div>
            </Card>

            <Card className={"my-3"}>
                <Card.Header>
                    <Text b>Qualifications ({qualifications.length})</Text>
                </Card.Header>
                <Card.Body>
                    {qualifications.map((item, i) => <div key={i} className="flex mb-3 items-center justify-between">
                        <Text>{item.name} </Text>
                        <Avatar squared src={item.url}/>
                    </div>)}
                </Card.Body>
            </Card>

            <Card className={"my-3"}>
                <Card.Header>
                    <Text b>Reviews ({reviews.length})</Text>
                </Card.Header>
                <Card.Body>
                    {reviews.map((item ,i) => <ReviewItem  key={i} item={item}/>)}
                </Card.Body>
            </Card>
        </div>
    )
}
