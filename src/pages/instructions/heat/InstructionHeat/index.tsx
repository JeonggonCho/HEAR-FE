import Header from "@components/Header";
import ArrowBack from "@components/ArrowBack";
import heat from "@assets/images/heat_cutter.png";
import {MachineImgWrapper} from "./style.ts";
import Tab from "@components/Tab";
import React, {useState} from "react";
import {Content} from "../../printer/InstructionPrinter/style.ts";
import Introduction from "../Introduction";
import {ITab} from "@/types/tab.ts";

const tabs: ITab[] = [
    { name: "소개", content: <Introduction/>, },
];

const InstructionHeat = () => {
    const [activeIndex, setActiveIndex] = useState<number>(0);

    return (
        <div>
            <Header leftChild={<ArrowBack/>} centerText={"열 선"}/>
            <MachineImgWrapper>
                <img src={heat} alt="열선"/>
            </MachineImgWrapper>
            <Tab tabs={tabs} activeIndex={activeIndex} setActiveIndex={setActiveIndex}/>
            <Content>{tabs[activeIndex].content}</Content>
        </div>
    );
};

export default React.memo(InstructionHeat);