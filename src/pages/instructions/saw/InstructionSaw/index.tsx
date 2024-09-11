import React, {FC, useEffect, useState} from "react";

import Header from "@components/Header";
import ArrowBack from "@components/ArrowBack";
import Tab from "@components/Tab";

import {ITab} from "@/types/tab.ts";

import {Content} from "../../printer/InstructionPrinter/style.ts";
import {MachineImgWrapper} from "./style.ts";

import saw from "@assets/images/saw.png";

import Warning from "../Warning";
import After from "../After";

const tabs: ITab[] = [
    { name: "주의사항", content: <Warning/>, },
    { name: "사용후", content: <After/>, },
];

const InstructionSaw:FC = () => {
    const [activeIndex, setActiveIndex] = useState<number>(0);

    useEffect(() => {
        window.scrollTo({top: 0, behavior: "smooth"});
    }, [activeIndex]);

    return (
        <div>
            <Header leftChild={<ArrowBack/>} centerText={"톱"}/>
            <MachineImgWrapper>
                <img src={saw} alt="톱"/>
            </MachineImgWrapper>
            <Tab type={"button"} tabs={tabs} activeIndex={activeIndex} setActiveIndex={setActiveIndex}/>
            <Content>{tabs[activeIndex].content}</Content>
        </div>
    );
};

export default React.memo(InstructionSaw);