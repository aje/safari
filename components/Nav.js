import { Navbar, Button, Link, Text, Card, Radio } from "@nextui-org/react";
import {Caravan} from "@styled-icons/remix-line/Caravan"
import {ImageAdd} from "@styled-icons/remix-line/ImageAdd"
import {User3} from "@styled-icons/remix-line/User3"
const Nav = () => {
    return (<>
        <div className={"fixed bottom-0 z-50 p-4 w-screen"}>
            <div className={"bg-white rounded shadow-md flex justify-around w-full p-4"}>
                <Link className={"text-gray-400"} href="/signin"><Caravan  size={26}/></Link>
                <Link className={"bg-primary -mt-2 shadow-4 -mb-2 shadow-lg shadow-primary/50 p-3 rounded-full text-white"} href="#"><ImageAdd  size={26}/></Link>
                <Link className={"text-gray-400"} href="/profile"><User3  size={26}/></Link>
            </div>
        </div>
    </>);
};

export default Nav;
