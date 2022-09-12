import Head from 'next/head'
import {signIn, useSession, signOut} from "next-auth/react";

import {Button, Container, styled, Text, useTheme} from "@nextui-org/react";

import {Flag} from "@styled-icons/entypo/Flag";
import {Caravan} from "@styled-icons/remix-line/Caravan";


export default function Home() {
    const { data: session } = useSession();
    const {theme} = useTheme();

    return (
        <div className={"bg-primary/10 pt-52 pb-32 text-center"}>
            <Container xl>
                <div >

                    <main className={"flex flex-col items-center"}>
                        <h1 className={"font-bold text-5xl"}>Everything begins with an <span className="text-primary"> idea</span></h1>
                        <Caravan size={20}/>
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

                    </main>
                </div>
            </Container>
        </div>
    )
}
