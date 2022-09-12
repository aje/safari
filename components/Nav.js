import { Navbar, Button, Link, Text, Card, Radio } from "@nextui-org/react";
import {Caravan} from "@styled-icons/remix-line/Caravan"
import {ImageAdd} from "@styled-icons/remix-line/ImageAdd"
import {User3} from "@styled-icons/remix-line/User3"
import { useRouter } from 'next/router'
import {clsx} from "clsx";


const Nav = () => {
    const {route} = useRouter();
    console.log(route);
    return (<>
        <div className={"fixed bottom-0 z-50 p-4 w-screen"}>
            <div className={"bg-white rounded shadow-md flex justify-around w-full p-4"}>
                <Link className={clsx(route === "/signin" ? "text-primary": "text-gray-400", 'relative')} href="/signin">
                    {route === "/signin" && <>
                        <span className="triangle"/>
                    </>}
                    <Caravan  size={26}/>
                </Link>
                <Link className={"bg-primary -mt-2 -mb-2 shadow-lg shadow-primary/50 p-3 rounded-full text-white"} href="#"><ImageAdd  size={26}/></Link>
                <Link  className={clsx(route === "/profile" ? "text-primary": "text-gray-400", 'relative')} href="/profile">
                    {route === "/profile" && <>
                        <span className="triangle"/>
                    </>}
                    <User3  size={26}/>
                </Link>
            </div>
        </div>
    </>);
};

export default Nav;
