import Nav from './Nav'
import Footer from './Footer'
import {useSession} from "next-auth/react";

const Layout = ({children, noNav}) => {
    const { data: session } = useSession();
    return (<>
            {session && <Nav />}
            <main>{children}</main>
        {/*<Footer />*/}
        </>
)
};

export default Layout
