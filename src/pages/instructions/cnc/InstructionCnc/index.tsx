import Header from "@components/Header";
import ArrowBack from "@components/ArrowBack";
import cnc from "@assets/images/cnc.png";
import {MachineImgWrapper} from "./style.ts";
import Tab from "@components/Tab";
import {Content} from "../../printer/InstructionPrinter/style.ts";
import React, {useState} from "react";
import Introduction from "../Introduction";
import Work from "../Work";
import {ITab} from "@/types/tab.ts";

const tabs: ITab[] = [
    { name: "소개", content: <Introduction/>, },
    { name: "작업", content: <Work/>, },
];

const InstructionCnc = () => {
    const [activeIndex, setActiveIndex] = useState<number>(0);

    return (
        <div>
            <Header leftChild={<ArrowBack/>} centerText={"CNC"}/>
            <MachineImgWrapper>
                <img src={cnc} alt="CNC"/>
            </MachineImgWrapper>
            <Tab tabs={tabs} activeIndex={activeIndex} setActiveIndex={setActiveIndex}/>
            <Content>{tabs[activeIndex].content}</Content>
        </div>
    );
};

export default React.memo(InstructionCnc);