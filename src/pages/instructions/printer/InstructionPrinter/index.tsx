import {useState} from "react";
import Header from "../../../../components/Header";
import ArrowBack from "../../../../components/ArrowBack";
import printer from "../../../../assets/images/3d_printer.png";
import {Content, MachineImgWrapper} from "./style.ts";
import Tab, {ITab} from "../../../../components/Tab";
import Introduction from "../Introduction";
import Preparation from "../Preparation";
import After from "../After";
import Usage from "../Usage";

const tabs: ITab[] = [
    { name: "소개", content: <Introduction/>, },
    { name: "준비", content: <Preparation/>, },
    { name: "사용", content: <Usage/>, },
    { name: "사용후", content: <After/>, },
];

const InstructionPrinter = () => {
    const [activeIndex, setActiveIndex] = useState<number>(0);

    return (
        <div>
            <Header leftChild={<ArrowBack/>} centerText={"3D 프린터"}/>
            <MachineImgWrapper>
                <img src={printer} alt="3d 프린터"/>
            </MachineImgWrapper>
            <Tab tabs={tabs} activeIndex={activeIndex} setActiveIndex={setActiveIndex}/>
            <Content>{tabs[activeIndex].content}</Content>
        </div>
    );
};

export default InstructionPrinter;