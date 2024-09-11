import React, {useState, useEffect, FC} from "react";

import Header from "@components/Header";
import ArrowBack from "@components/ArrowBack";
import Tab from "@components/Tab";

import {ITab} from "@/types/tab.ts";

import {MachineImgWrapper} from "./style.ts";
import {Content} from "../../printer/InstructionPrinter/style.ts";

import cnc from "@assets/images/cnc.png";

import Introduction from "../Introduction";
import Work from "../Work";

const tabs: ITab[] = [
    { name: "소개", content: <Introduction/>, },
    { name: "작업", content: <Work/>, },
];

const InstructionCnc:FC = () => {
    const [activeIndex, setActiveIndex] = useState<number>(0);

    useEffect(() => {
        window.scrollTo({top: 0, behavior: "smooth"});
    }, [activeIndex]);

    return (
        <div>
            <Header leftChild={<ArrowBack/>} centerText={"CNC"}/>
            <MachineImgWrapper>
                <img src={cnc} alt="CNC"/>
            </MachineImgWrapper>
            <Tab type={"button"} tabs={tabs} activeIndex={activeIndex} setActiveIndex={setActiveIndex}/>
            <Content>{tabs[activeIndex].content}</Content>
        </div>
    );
};

export default React.memo(InstructionCnc);