import React, {FC, useEffect, useState} from "react";

import Header from "@components/Header";
import ArrowBack from "@components/ArrowBack";
import Tab from "@components/Tab";

import {ITab} from "@/types/tab.ts";

import {MachineImgWrapper} from "./style.ts";
import {Content} from "../../printer/InstructionPrinter/style.ts";

import vacuum from "@assets/images/vacuum.png";

import Introduction from "../Introduction";
import Preparation from "../Preparation";
import Usage from "../Usage";

const tabs: ITab[] = [
    { name: "소개", content: <Introduction/>, },
    { name: "준비", content: <Preparation/>, },
    { name: "사용", content: <Usage/>, },
];

const VacuumImage = React.memo(() => (
    <MachineImgWrapper>
        <img src={vacuum} alt="사출 성형기"/>
    </MachineImgWrapper>
));

const InstructionVacuum:FC = () => {
    const [activeIndex, setActiveIndex] = useState<number>(0);

    useEffect(() => {
        window.scrollTo({top: 0, behavior: "smooth"});
    }, [activeIndex]);

    return (
        <div>
            <Header leftChild={<ArrowBack/>} centerText={"사출 성형기"}/>
            <VacuumImage/>
            <Tab type={"button"} tabs={tabs} activeIndex={activeIndex} setActiveIndex={setActiveIndex}/>
            <Content>{tabs[activeIndex].content}</Content>
        </div>
    );
};

export default React.memo(InstructionVacuum);