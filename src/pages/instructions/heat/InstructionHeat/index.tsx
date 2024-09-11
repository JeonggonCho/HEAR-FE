import React, {FC, useEffect, useState} from "react";

import Header from "@components/Header";
import ArrowBack from "@components/ArrowBack";
import Tab from "@components/Tab";

import {ITab} from "@/types/tab.ts";

import {MachineImgWrapper} from "./style.ts";

import heat from "@assets/images/heat_cutter.png";

import {Content} from "../../printer/InstructionPrinter/style.ts";
import Introduction from "../Introduction";

const tabs: ITab[] = [
    { name: "소개", content: <Introduction/>, },
];

const InstructionHeat:FC = () => {
    const [activeIndex, setActiveIndex] = useState<number>(0);

    useEffect(() => {
        window.scrollTo({top: 0, behavior: "smooth"});
    }, [activeIndex]);

    return (
        <div>
            <Header leftChild={<ArrowBack/>} centerText={"열 선"}/>
            <MachineImgWrapper>
                <img src={heat} alt="열선"/>
            </MachineImgWrapper>
            <Tab type={"button"} tabs={tabs} activeIndex={activeIndex} setActiveIndex={setActiveIndex}/>
            <Content>{tabs[activeIndex].content}</Content>
        </div>
    );
};

export default React.memo(InstructionHeat);