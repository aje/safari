import React from 'react';
import PageTitle from "../components/PageTitle";
import {Text} from "@nextui-org/react";
import Link from "next/link";

const About = () => {
    return (<>
        <PageTitle withBackButton title={"ABOUT US"}/>
        <div className="p-8">
            <Text h4>WHY SAFARIA?</Text>
            <Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium ad culpa dignissimos fuga harum labore maiores minus molestiae nisi officia quas qui quia quos rem soluta, ullam velit veritatis vero.</Text>
            <Text h4 className="bg-">Remaining essentially </Text>
            <Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium ad culpa dignissimos fuga harum labore maiores minus molestiae nisi officia quas qui quia quos rem soluta, ullam velit veritatis vero.</Text>

            <div className="flex mt-10 justify-around px-10">
                <Link href={"/"} className={"mr-5"}>Go Back Home</Link>
                -
                <Link href={"/signin"}>Login</Link>
            </div>
            {/*<NextLink href="/signin"><Link className={"mt-5"} color={"secondary"}>Signin</Link></NextLink>*/}
            {/*<NextLink href="/"><Link className={"mt-5"} color={"secondary"}>Go Back Home</Link></NextLink>*/}
        </div>
    </>);
};

export default About;
