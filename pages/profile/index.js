import {signOut, useSession} from "next-auth/react";
import {Avatar, Badge, Button, Card, Dropdown, Navbar, Text} from "@nextui-org/react";
import {Verified} from "@styled-icons/material-rounded/Verified"
import {Tab} from '@headlessui/react'
import Rating2 from "../../components/Rating2";
import {MoreVert} from "@styled-icons/material-rounded/MoreVert";
import LoadingPage from "../../components/LoadingPage";
import Travelers from "../../components/guide/Travelers";
import Qualifications from "../../components/guide/Qualifications";
import Reviews from "../../components/guide/Reviews";
import Info from "../../components/guide/Info";
import Level from "../../components/guide/Level";
import Badges from "../../components/guide/Badges";
import React, {useEffect, useState} from "react";
import Achievements from "../../components/guide/Achievements";
import {authOptions} from '../api/auth/[...nextauth]';
import {unstable_getServerSession} from "next-auth/next"
import * as models from "../../models/models";
import {useRouter} from "next/router";

export default function Profile({driver}) {
    const { data: session } = useSession();
    // console.log(driver);

    const {qualifications, badges, reviews, travelers, achievements} = driver || {};

    const [selectedIndex, setSelectedIndex] = useState(0);
    const user  = session?.user;

    // console.log(driver);

    // const qualifications = [
    //     {url: "https://i.pravatar.cc/150?u=a048581f4e29026701d", name: "Certification of Traveling"},
    //     {url: "https://i.pravatar.cc/150?u=a042581f4e29026704d", name: "Traveling certificate"},
    //     {url: "https://i.pravatar.cc/150?u=a04258114e29026702d", name: "Tourism Licence"},
    // ];
    //
    // const badges = [
    //     {url: "https://i.pravatar.cc/150?u=a048581f4e29026701d", name: "this badge"},
    //     {url: "https://i.pravatar.cc/150?u=a042581f4e29026704d", name: "this badge"},
    //     {url: "https://i.pravatar.cc/150?u=a04258114e29026702d", name: "this badge"},
    //     {url: "https://i.pravatar.cc/150?u=a048581f4e29026701d", name: "this badge"},
    // ];
    //
    // const reviews = [
    //     {
    //         user: {
    //             image: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    //             name: "Ariana Wattson",
    //         },
    //         rating: 2.5,
    //         description: "This trip was great and Lorem ipsum dolor sit ame obcaecati omnis placeat quam, quisquam, recusandae sit ullam!",
    //         timestamp: 1663143033901
    //     },
    //     {
    //         user: {
    //             image: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    //             name: "Ariana Wattson Golabforoush",
    //         },
    //         rating: 5,
    //         description: "This trip was great and Lorem ipsum dolor sit ame obcaecati omnis placeat quam, quisquam, recusandae sit ullam!",
    //         images: [
    //             "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    //             "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    //             "https://i.pravatar.cc/150?u=a04258114e29026702d",
    //             "https://i.pravatar.cc/150?u=a048581f4e29026701d",
    //         ],
    //         timestamp: 1663143033901
    //     },
    // ];
    //
    // const travelers = [
    //     {
    //         id: "i",
    //         user: {
    //             image: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
    //             name: "Ariana Wattson Golabforoush",
    //         },
    //     },
    //     {
    //         id: "is",
    //         user: {
    //             image: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    //             name: "Ariana Wattson Golabforoush",
    //         },
    //     },
    //     {
    //         id: "i",
    //         user: {
    //             image: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
    //             name: "Ariana Wattson Golabforoush",
    //         },
    //     },
    //     {
    //         id: "is",
    //         user: {
    //             image: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    //             name: "Ariana Wattson Golabforoush",
    //         },
    //     },
    //     {
    //         id: "ia",
    //         user: {
    //             image: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    //             name: "Ariana Wattson Golabforoush",
    //         },
    //     },
    //     {
    //         id: "if",
    //         user: {
    //             image: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
    //             name: "Ariana Wattson Golabforoush",
    //         },
    //     },
    //     {
    //         id: "is",
    //         user: {
    //             image: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    //             name: "Ariana Wattson Golabforoush",
    //         },
    //     },
    //     {
    //         id: "ia",
    //         user: {
    //             image: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    //             name: "Ariana Wattson Golabforoush",
    //         },
    //     },
    //     {
    //         id: "if",
    //         user: {
    //             image: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
    //             name: "Ariana Wattson Golabforoush",
    //         },
    //     },
    // ];
    //
    // const achievements = [
    //     {
    //         image: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
    //         name: "First Trips",
    //         action: "Trips added",
    //         current: 1,
    //         max: 3,
    //     },
    //     {
    //         image: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    //         name: "First traveler",
    //         action: "Traveler invited",
    //         current: 2,
    //         max: 3,
    //     },
    //     {
    //         image: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
    //         name: "First driver friend",
    //         action: "Driver invited",
    //         current: 3,
    //         max: 3,
    //     },
    // ];

    const onMoreMenu = (key) => {
        switch (key) {
            case "upload":

                break;
            case "edit":

                break;
            case "logout":
                signOut({ callbackUrl: '/signin' });
                break;
            default:

        }
    };
    const router = useRouter();
    useEffect(()=>{
        if(!driver) {
            router.push("/")
        }
    }, [driver]);

    if(!session || !driver) return <LoadingPage />;

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
            <Text >{user.email}</Text>
            <div className="flex items-center justify-between">
                <Rating2 value={3.5} readonly count={reviews.length}/>
                <div className={"flex"}>
                    {/*<Button size={'xs'} icon={<Edit size={16} color={"gray"}/>} light auto></Button>*/}
                    <Dropdown>
                        <Dropdown.Trigger><Button className={'text-gray-500 hover:bg-primary hover:text-white rounded-full h-10 w-10 p-0'} light auto><MoreVert size={20}/></Button></Dropdown.Trigger>
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
                    className={"mt-2"}
                    // containerCss={{backgroundColor: "transparent !important"}}
                    isCompact variant="sticky">
                    <Tab.List className={"text-sm"} as={Navbar.Content} activeColor={"primary"} variant="highlight">
                        <Tab as={Navbar.Link} isActive={selectedIndex === 0}>Achievements</Tab>
                        <Tab  as={Navbar.Link} isActive={selectedIndex === 1}>Info</Tab>
                    </Tab.List>
                </Navbar>
                <Tab.Panels>
                    <Tab.Panel>
                        <Level current={260} max={1000} lvl={5}/>
                        <Achievements data={achievements}/>
                        <Badges data={badges}/>
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


export async function getServerSideProps(context) {
    const session = await unstable_getServerSession(context.req, context.res, authOptions);
    let driver = null;
    try {
        driver = await models.Driver.findOne({user: {_id: session?.user._id}}).populate({ path: 'reviews', model: models.Review});
    } catch (e) {
        console.log(e);
    }
    return {
        props: {driver: JSON.parse(JSON.stringify(driver)) },
    };
}

