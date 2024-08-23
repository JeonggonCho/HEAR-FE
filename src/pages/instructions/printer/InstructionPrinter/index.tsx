import React, {useEffect, useState} from "react";
import Header from "@components/Header";
import ArrowBack from "@components/ArrowBack";
import printer from "@assets/images/3d_printer.png";
import {Content, MachineImgWrapper} from "./style.ts";
import Tab from "@components/Tab";
import Introduction from "../Introduction";
import Preparation from "../Preparation";
import After from "../After";
import Usage from "../Usage";
import {ITab} from "@/types/tab.ts";

const tabs: ITab[] = [
    { name: "소개", content: <Introduction/>, },
    { name: "준비", content: <Preparation/>, },
    { name: "사용", content: <Usage/>, },
    { name: "사용후", content: <After/>, },
];

const PrinterImage = React.memo(() => (
    <MachineImgWrapper>
        <img src={printer} alt="3d 프린터"/>
    </MachineImgWrapper>
));

const InstructionPrinter = () => {
    const [activeIndex, setActiveIndex] = useState<number>(0);

    useEffect(() => {
        window.scrollTo({top: 0, behavior: "smooth"});
    }, [activeIndex]);

    return (
        <div>
            <Header leftChild={<ArrowBack/>} centerText={"3D 프린터"}/>
            <PrinterImage/>
            <Tab tabs={tabs} activeIndex={activeIndex} setActiveIndex={setActiveIndex}/>
            <Content>{tabs[activeIndex].content}</Content>
        </div>
    );
};

export default React.memo(InstructionPrinter);