import Nav from './Nav'
import {useSession} from "next-auth/react";
import BackgroundGradient from "./BackgroundGradient";
import React from "react";
import {useRouter} from "next/router";
import {Toaster} from "react-hot-toast";
import {hiddenPaths} from "../variables";



const Layout = ({children}) => {
    const { data: session } = useSession();
    const router = useRouter();
    const shouldHideNav = hiddenPaths.includes(router.pathname)

    const {route} = useRouter();
    return (<>
            <BackgroundGradient />
            {session && !shouldHideNav && <Nav />}
            <main className={"z-20 relative"} >{children}</main>

            <Toaster reverseOrder />
        {/*<Footer />*/}
        </>
)
};

export default Layout
