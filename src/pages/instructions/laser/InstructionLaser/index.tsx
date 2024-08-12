import Header from "../../../../components/Header";
import ArrowBack from "../../../../components/ArrowBack";
import laser from "../../../../assets/images/laser_cut.png";
import {MachineImgWrapper} from "./style.ts";
import Tab, {ITab} from "../../../../components/Tab";
import {useState} from "react";
import {Content} from "../../printer/InstructionPrinter/style.ts";
import Introduction from "../Introduction";
import Usage from "../Usage";
import After from "../After";
import Preparation from "../Preparation";

const tabs: ITab[] = [
    { name: "소개", content: <Introduction/>, },
    { name: "준비", content: <Preparation/>, },
    { name: "사용", content: <Usage/>, },
    { name: "사용후", content: <After/>, },
];

const InstructionLaser = () => {
    const [activeIndex, setActiveIndex] = useState<number>(0);

    return (
        <div>
            <Header leftChild={<ArrowBack/>} centerText={"레이저 커팅기"}/>
            <MachineImgWrapper>
                <img src={laser} alt="레이저 커팅기"/>
            </MachineImgWrapper>
            <Tab tabs={tabs} activeIndex={activeIndex} setActiveIndex={setActiveIndex}/>
            <Content>{tabs[activeIndex].content}</Content>
        </div>
    );
};

export default InstructionLaser;