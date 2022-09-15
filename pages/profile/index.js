import {signIn, useSession, signOut} from "next-auth/react";
import {Button,Dropdown,Navbar, Badge, Avatar, Container, styled, Text, useTheme, Progress} from "@nextui-org/react";
import {Verified} from "@styled-icons/material-rounded/Verified"
import { Tab } from '@headlessui/react'
import { Edit } from '@styled-icons/remix-line/Edit';
import { Card } from '@nextui-org/react';
import Rating from "../../components/Rating";
import ReviewItem from "../../components/ReviewItem";
import {MoreVert} from "@styled-icons/material-rounded/MoreVert";
import LoadingPage from "../../components/LoadingPage";
import Travelers from "../../components/guide/Travelers";
import Qualifications from "../../components/guide/Qualifications";
import Reviews from "../../components/guide/Reviews";
import Info from "../../components/guide/Info";
import Level from "../../components/guide/Level";
import Badges from "../../components/guide/Badges";
import React, {useState} from "react";


export default function Profile() {
    const { data: session } = useSession();

    const [selectedIndex, setSelectedIndex] = useState(0)
    if(!session) return <LoadingPage />;
    const {user}  = session;

    const qualifications = [
        {url: "https://i.pravatar.cc/150?u=a048581f4e29026701d", name: "Certification of Traveling"},
        {url: "https://i.pravatar.cc/150?u=a042581f4e29026704d", name: "Traveling certificate"},
        {url: "https://i.pravatar.cc/150?u=a04258114e29026702d", name: "Tourism Licence"},
    ];


    const pictureUsers = [
        "https://i.pravatar.cc/150?u=a042581f4e29026024d",
        "https://i.pravatar.cc/150?u=a042581f4e29026704d",
        "https://i.pravatar.cc/150?u=a04258114e29026702d",
        "https://i.pravatar.cc/150?u=a048581f4e29026701d",
    ];
    const badges = [
        {url: "https://i.pravatar.cc/150?u=a048581f4e29026701d", name: "this badge"},
        {url: "https://i.pravatar.cc/150?u=a042581f4e29026704d", name: "this badge"},
        {url: "https://i.pravatar.cc/150?u=a04258114e29026702d", name: "this badge"},
        {url: "https://i.pravatar.cc/150?u=a048581f4e29026701d", name: "this badge"},
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

            <Tab.Group  selectedIndex={selectedIndex} onChange={setSelectedIndex}>
                <Navbar
                    as={Card}
                    className={"mt-5"}
                    // containerCss={{backgroundColor: "transparent !important"}}
                    isCompact variant="sticky">
                    <Tab.List className={"text-sm"} as={Navbar.Content} activeColor={"primary"} variant="highlight">
                        <Tab as={Navbar.Link} isActive={selectedIndex === 0}>Achievements</Tab>
                        <Tab  as={Navbar.Link} isActive={selectedIndex === 1}>Info</Tab>
                    </Tab.List>
                </Navbar>
                <Tab.Panels>
                    <Tab.Panel>
                        <Level currentXP={260} endLvlXP={1000} lvl={5}/>

                        <Badges badges={badges}/>

                        <Travelers data={travelers}/>

                        <Reviews data={reviews}/>
                    </Tab.Panel>
                    <Tab.Panel>
                        <Info  data={{
                            bio: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias architecto beatae consequatur deserunt dignissimos dolorem eaque eius eos est iusto officia quidem rem reprehenderit repudiandae sit unde, velit voluptates voluptatum!",
                            languages: "English, Chinese",
                            age: 33,
                            experience: 10
                        }}/>
                        <Qualifications data={qualifications}/>
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>






        </div>
    )
}