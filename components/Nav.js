import {Link} from "@nextui-org/react";
import NextLink from 'next/link';
import {Caravan} from "@styled-icons/remix-line/Caravan"
import {ImageAdd} from "@styled-icons/remix-line/ImageAdd"
import {User3} from "@styled-icons/remix-line/User3"
import {useRouter} from 'next/router'
import {clsx} from "clsx";


const Nav = () => {
    const {route} = useRouter();
    return (<div className={"fixed bottom-0 z-50  w-screen"}>
        <div className="bg-gradient-to-t from-slate-100  h-10 w-full"/>
        <div className={"px-4 pt- pb-4 w-full bg-slate-100"}>
            <div className={"bg-white rounded shadow-md flex justify-around w-full p-4"}>
                <NextLink href="/">
                <Link className={clsx(route === "/" ? "text-primary": "text-gray-400", 'relative')}>
                    <>
                    {route === "/" && <>
                        <span className="triangle2 bg-slate-100"/>
                        <span className="triangle"/>
                    </>}
                    <Caravan  size={26}/>
                    </>
                </Link>
                </NextLink>
                <NextLink href="/upload"><Link className={clsx("bg-primary" ,"-mt-2 -mb-2 shadow-lg shadow-primary/50 p-3 rounded-full text-white")}><ImageAdd  size={26}/></Link></NextLink>
                <NextLink href="/profile">
                    <Link  className={clsx(route === "/profile" ? "text-primary": "text-gray-400", 'relative')} >
                        <>
                            {route === "/profile" && <>
                            <span className="triangle2 bg-slate-100"/>
                            <span className="triangle"/>
                            </>}
                            <User3  size={26}/>
                        </>
                    </Link>
                </NextLink>
            </div>
        </div>
    </div>);
};

export default Nav;
