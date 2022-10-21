import {signOut, useSession} from "next-auth/react";
import {Avatar, Badge, Button, Card, Dropdown, Navbar, Text} from "@nextui-org/react";
import {Verified} from "@styled-icons/material-rounded/Verified"
import {Tab} from '@headlessui/react'
import {MoreVert} from "@styled-icons/material-rounded/MoreVert";
import LoadingPage from "../../components/LoadingPage";
import Travelers from "../../components/guide/Travelers";
import Qualifications from "../../components/guide/Qualifications";
import Info from "../../components/guide/Info";
import Level from "../../components/guide/Level";
import Badges from "../../components/guide/Badges";
import React, {useEffect, useState} from "react";
import Achievements from "../../components/guide/Achievements";
import {authOptions} from '../api/auth/[...nextauth]';
import {unstable_getServerSession} from "next-auth/next"
import * as models from "../../models/models";
import {useRouter} from "next/router";
import MyRating from "../../components/MyRating";
import Reviews from "../../components/guide/Reviews";

import {DotsThreeVertical} from "@styled-icons/entypo/DotsThreeVertical";

export default function Profile({driver}) {
    const { data: session } = useSession();

    const {qualifications, badges,  travelers, achievements, xp} = driver || {};

    const [selectedIndex, setSelectedIndex] = useState(0);
    const user  = session?.user;

    const onMoreMenu = (key) => {
        switch (key) {
            case "upload":
                router.push("/profile/upload_qu")
                break;
            case "edit":
                router.push("/profile/edit")
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
                <MyRating value={driver.ratingsAverage} readonly count={driver.ratingsQuantity}/>
                <div className={"flex"}>
                    {/*<Button size={'xs'} icon={<Edit size={16} color={"gray"}/>} light auto></Button>*/}
                    <Dropdown>
                        <Dropdown.Trigger><Button className={'text-gray-500 hover:bg-primary hover:text-white rounded-full h-10 w-10 p-0'} light auto><DotsThreeVertical size={20}/></Button></Dropdown.Trigger>
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
                        <Level current={xp} max={1000} lvl={parseInt(xp/1000)}/>
                        <Achievements data={achievements}/>
                        <Badges data={badges}/>
                        <Travelers data={travelers}/>
                        <Reviews data={driver.reviews} total={driver.ratingsQuantity}/>
                        {/*<Reviews data={reviews}/>*/}
                    </Tab.Panel>
                    <Tab.Panel>
                        <Qualifications data={qualifications}/>
                        <Info driver={driver}/>
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
        driver = await models.Driver.findOne({user: {_id: session?.user._id}})
            .populate({ path: 'reviews', select: 'post author rating description createdAt', options: { sort: { 'createdAt': -1 } }})
            // .populate({ path: 'reviews', model: models.Review});
    } catch (e) {
        console.log(e);
    }
    return {
        props: {driver: JSON.parse(JSON.stringify(driver)) },
    };
}

