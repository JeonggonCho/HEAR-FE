import React, {FC, useEffect, useState} from "react";

import Header from "@components/Header";
import ArrowBack from "@components/ArrowBack";
import Tab from "@components/Tab";

import {ITab} from "@/types/tab.ts";

import {MachineImgWrapper} from "./style.ts";
import {Content} from "../../printer/InstructionPrinter/style.ts";

import laser from "@assets/images/laser_cut.png";

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

const LaserImage = React.memo(() => (
    <MachineImgWrapper>
        <img src={laser} alt="레이저 커팅기"/>
    </MachineImgWrapper>
));

const InstructionLaser:FC = () => {
    const [activeIndex, setActiveIndex] = useState<number>(0);

    useEffect(() => {
        window.scrollTo({top: 0, behavior: "smooth"});
    }, [activeIndex]);

    return (
        <div>
            <Header leftChild={<ArrowBack/>} centerText={"레이저 커팅기"}/>
            <LaserImage/>
            <Tab tabs={tabs} activeIndex={activeIndex} setActiveIndex={setActiveIndex}/>
            <Content>{tabs[activeIndex].content}</Content>
        </div>
    );
};

export default React.memo(InstructionLaser);