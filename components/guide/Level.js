import {Card, Progress, Text} from "@nextui-org/react";

const Level = ({lvl, currentXP, endLvlXP }) => {
    return (
        <Card className={"my-5"} >
            <div className="px-4 flex justify-between items-end">
                <div>
                    <Text span weight="bold" color={"primary"} size={60}>{lvl}</Text>
                    <Text span color={"gray"}>Lvl.</Text>
                </div>
                <span className={"mb-4"}><Text size={20} span weight={"bold"}>{currentXP}<small>XP</small></Text><Text span size={14}>/{endLvlXP}</Text></span>
            </div>
            <div className={"px-4 pb-4 -mt-2"}> <Progress color="primary" value={parseInt((currentXP * 100)/endLvlXP)} /></div>
        </Card>
        );
};

export default Level;
