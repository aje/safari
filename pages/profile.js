import Head from 'next/head'
import {signIn, useSession, signOut} from "next-auth/react";

import {Button, Container, styled, Text, useTheme} from "@nextui-org/react";

import {Flag} from "@styled-icons/entypo/Flag";
import {Caravan} from "@styled-icons/remix-line/Caravan";


export default function Home() {
    const { data: session } = useSession();
    const {theme} = useTheme();

    return (
        <div >

        </div>
    )
}
