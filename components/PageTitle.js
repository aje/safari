import {Button, Text} from "@nextui-org/react";
import React from "react";
import {ArrowBack} from "@styled-icons/material-rounded/ArrowBack";
import {useRouter} from "next/router";
import {clsx} from "clsx";

const PageTitle = ({title, withBackButton}) => {
    const router = useRouter();
    return (<div className={"flex relative pt-5 px-8 flex-col z-10 "} >
        <Text h1 className={"fixed font-mono z-0  opacity-5 left-0 truncate mb-0"}  style={{fontSize: 120, top: -35}}>{title}</Text>
        {withBackButton && <Button  onClick={() => router.back()} className={'text-gray-500 h over:bg-primary hover:text-white rounded-full h-10 w-10 p-0 -ml-2 mr-1'} light auto><ArrowBack size={26}/></Button>}

        <Text h1 color={'primary'} className={clsx(withBackButton ? "mt-2" : "mt-8", "relative font-mono mb-0 text-6xl")} >{title}</Text>
    </div>);
};

export default PageTitle;
