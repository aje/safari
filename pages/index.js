import {useSession} from "next-auth/react";
import React, {useState} from "react"

import {Button, Text, useTheme} from "@nextui-org/react";
import PageTitle from "../components/PageTitle";
import Image from "next/image";
import {ImageAdd} from "@styled-icons/remix-line/ImageAdd";
import {ArrowUpS} from "@styled-icons/remix-line/ArrowUpS";


export default function Home() {
    const { data: session } = useSession();
    const {theme} = useTheme();
    const [showTip, setShowTip] = useState(true);



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
                        <Button onPress={()=>setShowTip(false)} className={"mr-4"} icon={<ArrowUpS size={20}/>} rounded light auto>Dismiss</Button>
                        <Button color={"primary"} auto rounded icon={<ImageAdd size={24}/>} >Upload a trip</Button>
                     {/*</> :*/}
                     {/* <Button color={"primary"} auto rounded icon={<Car size={24}/>} >SING UP AS DRIVER</Button> }*/}
                </div></>}

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
