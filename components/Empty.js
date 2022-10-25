import {EmotionSad} from "@styled-icons/remix-line/EmotionSad"
import {Text} from "@nextui-org/react";

const Empty = ({label, noIcon, extra}) => {
    return (<div className={"flex py-4 flex-col w-full justify-center items-center"}>
        {!noIcon && <EmotionSad color={"#ccc"} size={40}/>}
            <Text h5 className={"mt-2"} color={"#ccc"}>{label || "No data"}</Text>
        {extra && extra}
        </div>);
};

export default Empty;
