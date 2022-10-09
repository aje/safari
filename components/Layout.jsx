import Nav from './Nav'
import {useSession} from "next-auth/react";
import BackgroundGradient from "./BackgroundGradient";
import React from "react";
import {useRouter} from "next/router";
import {Toaster} from "react-hot-toast";

const Layout = ({children, noNav}) => {
    const { data: session } = useSession();

    const {route} = useRouter();
    return (<>
            <BackgroundGradient />
            {session && <Nav />}
            <main className={"z-20 relative"} >{children}</main>

            <Toaster reverseOrder />
        {/*<Footer />*/}
        </>
)
};

export default Layout
