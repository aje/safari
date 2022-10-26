import React, {useState} from 'react';
import {useRouter} from "next/router";
import {Button, Card, Divider, Dropdown, Text, User} from "@nextui-org/react"
import Moment from "react-moment";
import MyRating from "../../../components/MyRating";
import Reviews from "../../../components/guide/Reviews";
import ReviewForm from "../../../components/trip/ReviewForm";
import {ArrowBack} from "@styled-icons/material-rounded/ArrowBack";
import Post from "../../../models/Post"
import dbConnect from "../../../services/dbconnect";
import * as models from "../../../models/models";
import {monthFormat} from "../../../variables";
import Empty from "../../../components/Empty";
import {DotsThreeVertical} from "@styled-icons/entypo/DotsThreeVertical";
import {useSession} from "next-auth/react";
import QRCode from "react-qr-code";
import {Download2} from "@styled-icons/remix-line/Download2";

const  Trip = ({item}) => {
    const [selectedImage, setSelectedImage] = useState(0);
    const {data: session} = useSession();

    const router = useRouter();


    const onMoreMenu = (key) => {
        switch (key) {
            case "edit":
                router.push(`/upload?edit=${item._id}`)
                break;
            case "delete":
                break;
            default:
        }
    };

    const downloadQR = () => {
        const svg = document.getElementById("qrcode");
        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.onload = function () {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            const pngFile = canvas.toDataURL("image/png");

            const downloadLink = document.createElement("a");
            downloadLink.download = "qrcode";
            downloadLink.href = `${pngFile}`;
            downloadLink.click();
        };

        img.src = "data:image/svg+xml;base64," + btoa(svgData);
    };

    const owner = session ? session.user?._id === item?.user?._id : false;
    return (!item ? <Empty label={"Not found"}/> : <div className={"pt-2 px-4 pb-28"}>
        <div className="flex items-center justify-between">
            <Button  onClick={() => router.back()} className={'text-gray-500 hover:bg-primary hover:text-white rounded-full h-10 w-10 p-0 -ml-2 mr-1'} light auto><ArrowBack size={26}/></Button>
            <div className="flex-grow">
                <User
                    className={"pl-0"}
                    size={"sm"}
                    src={item.user?.image}
                    name={item.user?.name}
                    description={<Moment format={monthFormat}>{item.timestamp}</Moment>}
                />
            </div>
            <Card className={"w-auto px-3 pb-1 rounded-full"}>
                <MyRating sm readonly value={item.ratingsAverage}
                          count={item.ratingsQuantity}
                />
            </Card>
            {owner &&
                <Dropdown>
                    <Dropdown.Trigger>
                        <Button
                            className={'text-gray-500 ml-2 hover:bg-primary hover:text-white rounded-full h-10 w-10 p-0'}
                            light auto><DotsThreeVertical size={20}/></Button></Dropdown.Trigger>
                    <Dropdown.Menu onAction={onMoreMenu} aria-label="Static Actions">
                        <Dropdown.Item key="edit">Edit</Dropdown.Item>
                        <Dropdown.Item key="logout" color="error">
                            Delete
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            }
        </div>
        {item.gallery.length === 0 ? <Card   className="my-4"><Empty label="No gallery! Please add pictures to publish"/></Card> :
            <>
        <Card  variant="flat" className="my-3">
            <Card.Image
                // height={350}
                showSkeleton
                width={"100%"}
                src={item.gallery?.[selectedImage].originalUrl}
                objectFit="cover"
            />
        </Card>
        <div className="flex overflow-x-scroll">
            {item.gallery.map((image, i) =>
                <Card isPressable onClick={()=> setSelectedImage(i)} key={i} variant={"flat"}  className={"w-auto mr-3 flex-shrink-0"}>
                    <Card.Body css={{ p: 0 }}>
                        <Card.Image
                            src={image.originalUrl}
                            objectFit="cover"
                            width={100}
                            height={100}
                            alt={image}
                        />
                    </Card.Body>
                </Card>
            )}
        </div>
        </>}

        {/*{item.travelers.length > 0 && <>*/}
        {/*    <Text h6 className={"mt-5"}>Travelers participated in this trip ({item.travelers?.length})</Text>*/}
        {/*    <div className="flex pb-3 overflow-x-scroll">*/}
        {/*        {item.travelers.map((traveler, i) => <Card key={i} variant={"bordered"}*/}
        {/*                                                   className={"w-auto mr-2 flex-shrink-0 rounded-full"}>*/}
        {/*            <User*/}
        {/*                className={"pl-0"}*/}
        {/*                size={"sm"}*/}
        {/*                src={traveler.user?.image}*/}
        {/*                name={traveler.user?.name}*/}
        {/*            />*/}
        {/*        </Card>)}*/}
        {/*    </div>*/}
        {/*</>}*/}
        <Card className={"mt-2"}>
            <Card.Header><Text h6>{item.title}</Text></Card.Header>
            <Card.Body className={"pt-0"}>{item.description}</Card.Body>
        </Card>
        <Card className={"mt-5"}>
            <Card.Header><Text h6>Travellers</Text></Card.Header>
            <Card.Body className={"pt-0"}>
                {item.travelers?.length > 0 ? "Show " : <Empty />}
            </Card.Body>
            {owner && <><Divider />
            <Card.Body className={" bg-gray-50 "}>
                <div className="flex flex-col items-center">
                    <Text h5>Share to invite travelers</Text>
                    <QRCode id="qrcode" value={window.location.href + "?invite=true"}/>
                    <Button  className={"mt-5"} onPress={downloadQR} auto color={"primary"} light icon={<Download2 size={20}/>}>Save QR Code</Button>
                </div>
            </Card.Body>
            </>}
        </Card>



        {(!owner ) && <ReviewForm post={item}/>}
        <Reviews data={item.reviews} total={item.ratingsQuantity}/>

    </div>);
};

export default Trip;

export async function getServerSideProps({ params }) {
    const {id} = params;
    await dbConnect();
    let item = null;
    try {
        item = await Post.findOne({ _id: id}).populate({ path: 'user', model: models.User})
            .populate({ path: 'reviews', select: 'post author rating description createdAt', options: { sort: { 'createdAt': -1 } }});
        // console.log(item);
    } catch (e) {
        console.log(e);
    }
    return {
        props: {
            item: JSON.parse(JSON.stringify(item)),
        },
    };
}
