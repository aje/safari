import {Text} from "@nextui-org/react";
import React from "react";

const PageTitle = ({title}) => {
    return (<div className={"flex relative pt-5 px-8 flex-col z-10 "} >
        <Text h1 className={"fixed font-mono z-0  opacity-5 left-0 truncate mb-0"}  style={{fontSize: 120, top: -35}}>{title}</Text>
        <Text h1 color={'primary'} className={"relative font-mono mb-0 text-6xl mt-8"} >{title}</Text>
    </div>);
};

export default PageTitle;
