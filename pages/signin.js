import { getProviders, signIn } from "next-auth/react"
import { getSession } from "next-auth/react"
import React from "react";
import Image from "next/image";
import {Button, Card, Input, Text} from "@nextui-org/react";
import {Github} from "@styled-icons/entypo-social/Github";
import PageTitle from "../components/PageTitle";
import BackgroundGradient from "../components/BackgroundGradient";


export default function SignIn({ providers }) {
    return (
        <>

            <PageTitle title={"Login"}/>
            <div className={"flex relative flex-col z-10 p-10"} >

                    <Input size={"lg"} bordered className={"mb-3"} label={"Username"} />
                    <Input size={"lg"} bordered className={"mb-8"} label={"Password"} type={"password"} />

                    <Button size={"lg"} className={"mb-12"} color={"primary"} rounded>Login</Button>

                <Text h6 className={"mb-5 text-center text-gray-700 font-normal"}>Or continue with social</Text>
            {Object.values(providers).map((provider) => (
                <Button className={"mb-4"} key={provider.name} size={"lg"} icon={<Github size={30} />} bordered onClick={() => signIn(provider.id)}>
                    Sign in with {provider.name}
                </Button>
            ))}

                {/*<Button>Sign in with Google</Button>*/}
            </div>
        </>
    )
}

export async function getServerSideProps(context) {
    const { req } = context;
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
