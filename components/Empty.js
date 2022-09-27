import {CancelPresentation} from "@styled-icons/material-rounded/CancelPresentation"
import {Text} from "@nextui-org/react";

const Empty = ({label, noIcon}) => {
    return (<div className={"flex py-4 flex-col w-full justify-center items-center"}>
        {!noIcon && <CancelPresentation color={"#ccc"} size={40}/>}
            <Text h5 className={"mt-2"} color={"#ccc"}>{label || "No data"}</Text>
        </div>);
};

export default Empty;
