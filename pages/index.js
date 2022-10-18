import {signOut, useSession} from "next-auth/react";
import React, {useState} from "react"
import {Button, Text, useTheme} from "@nextui-org/react";
import PageTitle from "../components/PageTitle";
import Image from "next/image";
import {ImageAdd} from "@styled-icons/remix-line/ImageAdd";
import {ArrowUpS} from "@styled-icons/remix-line/ArrowUpS";
import Link from "next/link";
import ListItem from "../components/trip/ListItem";
import Empty from "../components/Empty";
import {getTrips} from "../services/api_utils";


export default function Home({trips}) {
    // const { data: session } = useSession();
    // const {theme} = useTheme();
    const [showTip, setShowTip] = useState(true);

    // useEffect(()=>{
    //     axios.get(`/posts`).then(r => {
    //         console.log(r.data);
    //     })
    // }, []);

    // const trips = [
    //     {
    //         id: 1,
    //         rating: 5,
    //         title: "This was the great trip, one of the best ones really",
    //         description: "Lorem  ipsum docolor lorem    ",
    //         user: {
    //             image: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    //             name: "Ariana Wattson",
    //         },
    //         gallery: [
    //             "https://api.lorem.space/image?w=500&h=500",
    //             "https://api.lorem.space/image/house?w=500",
    //             "https://api.lorem.space/image/car?w=500",
    //             "https://api.lorem.space/image/drink?w=500",
    //             "https://api.lorem.space/image/burger?w=500",
    //             "https://api.lorem.space/image?w=500",
    //         ],
    //         timestamp: 1663143033901,
    //         reviewsCount: 88
    //     },
    //     {
    //         id: 2,
    //         rating: 5,
    //         title: "This was the great trip",
    //         description: "Lorem  ipsum docolor lorem    ",
    //         user: {
    //             image: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    //             name: "Ariana Wattson",
    //         },
    //         gallery: [
    //             "https://api.lorem.space/image?w=450&h=500",
    //             "https://api.lorem.space/image/house?w=500",
    //             "https://api.lorem.space/image/car?w=500",
    //             "https://api.lorem.space/image/drink?w=500",
    //             "https://api.lorem.space/image/burger?w=500",
    //             "https://api.lorem.space/image?w=500",
    //         ],
    //         timestamp: 1663143033901,
    //         reviewsCount: 150
    //     },
    // ];

    return (<>
        <PageTitle title={"SAFARICH"}/>
        <div  className={"px-5 pb-28 relative z-10"}>
            {showTip && <><Image src={"/home.png"} layout="responsive" width={"100vw"} quality={100} height={40}/>
            <div className={"mt-2"}>
                <Text h3 >Get travellers from China</Text>
                <Text >Gain People's attention to your old trips and gain their trust</Text>
            </div>
                 <div className="w-full justify-center my-3 flex">
                     {/*{session ? <>*/}
                     <Button
                         // onPress={()=>toast.success('SHOOO')}
                         onPress={()=>setShowTip(false)}
                         className={"mr-4"} icon={<ArrowUpS size={20}/>} rounded light auto>Dismiss</Button>
                     <Link href='/upload'><Button as={"a"} color={"primary"} auto rounded icon={<ImageAdd size={24}/>} >Upload a trip</Button></Link>
                     {/*</> :*/}
                     {/* <Button color={"primary"} auto rounded icon={<Car size={24}/>} >SING UP AS DRIVER</Button> }*/}
                </div></>}
        
                <div className="mt-8">
                    <Text h4>Trips</Text>
                    {trips?.length === 0 && <Empty/>}
                    {!!trips && trips.map((item, i) =>  <ListItem key={i} item={item} />)}
                </div>
        
                <Button onPress={()=> signOut({ callbackUrl: '/signin' })}>Sign out</Button>
                    {/*<h1 className={"font-bold text-5xl"}>Everything begins with an <span className="text-primary"> idea</span></h1>*/}
                    {/*<Caravan size={20}/>*/}
                    {/*<h1 className="text-5xl ">*/}
                    {/*    {session && <>*/}
                    {/*        {session.user.email}*/}
                    {/*        <button onClick={() => signOut()}>Sign out</button>*/}
                    {/*    </>}*/}
        
                    {/*    */}
                    {/*</h1>*/}
        
        
                    {/*<Link href={'/pages/signin'}>*/}
                    {/*    <a onClick={e=> {*/}
                    {/*        e.preventDefault();*/}
                    {/*        signIn().then(r => console.log(r))*/}
                    {/*    }}>Sign In</a>*/}
                    {/*</Link>*/}
        </div>
        </>
    )
}

export async function getServerSideProps() {
    const trips = await getTrips();
    return {
        props: { trips : JSON.parse(JSON.stringify(trips))},
    };
}
