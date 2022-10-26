import {getProviders, getSession, signIn} from "next-auth/react"
import React, {useState} from "react";
import {Button, Input, Loading, Text} from "@nextui-org/react";
import {Github} from "@styled-icons/entypo-social/Github";
import PageTitle from "../components/PageTitle";
import Link from "next/link";
import {Google} from "@styled-icons/remix-line";

export default function Login({ providers }) {
    // console.log(providers);
    const [loading, setLoading] = useState(false);
    const [gLoading, setGLoading] = useState(false);

    const onSignin = (p) => () => {
        if(p==="google")
            setGLoading(true)
        else
            setLoading(true)
        signIn(p)
    }

    return (
        <>
            <PageTitle title={"Login"}/>
            <div className={"flex relative flex-col z-10 p-8"} >

                {/*<Input size={"lg"} bordered className={"mb-3"} label={"Username"} />*/}
                {/*<Input size={"lg"} bordered className={"mb-8"} label={"Password"} type={"password"} />*/}

                {/*<Button size={"lg"} className={"mb-12"} color={"primary"} rounded>Login</Button>*/}

                {/*<Text h6 className={"mb-5 text-center text-gray-700 font-normal"}>Continue with social</Text>*/}
                {/*{Object.values(providers).map((provider) => (*/}
                <Button disabled={gLoading} className={"mb-5 bg-white border-1 shadow-2xl active:shadow borders-solid border-gray-600 text-gray-600"} size={"lg"} icon={<Google size={30} />} color={"inherit"} onClick={onSignin('google')}>
                    {gLoading ? <Loading  type="points-opacity" color="currentColor" size="sm" /> : <>Sign in with&nbsp; <strong>Google</strong></>}
                </Button>
                <Button disabled={loading}  className={"mb-5 bg-white border-1 shadow-2xl active:shadow borders-solid border-gray-600 text-gray-600"} size={"lg"} icon={<Github size={30} />}  color={"black"} onClick={onSignin('github')}>
                    {loading ? <Loading  type="points-opacity" color="currentColor" size="sm" /> : <>Sign in with&nbsp;<strong>Github</strong></>}
                </Button>
                {/*))}*/}
                

                <div className="flex mt-10 justify-around px-10">
                    <Link href={"/about"} className={"mr-5"}>About Us</Link>
                    -
                    <Link href={"/contact"}>Contact Us</Link>
                </div>

                {/*<Button>Sign in with Google</Button>*/}
            </div>
        </>
    )
}

export async function getServerSideProps({ req }) {
    const session = await getSession({ req });
    if (session) {
        return {
            redirect: { destination: "/" },
        };
    }

    return {
        props: {
            providers: await getProviders(),
        },
    };
}
