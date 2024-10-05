import React, {FC, useEffect, useState} from "react";

import Header from "@components/common/Header";
import ArrowBack from "@components/common/ArrowBack";
import Tab from "@components/common/Tab";

import {ITab} from "@/types/tab.ts";
import {machineInstructionTabCategories} from "@constants/machineCategories.ts";
import {machineName} from "@constants/machineCategories.ts";
import {useThemeStore} from "@store/useThemeStore.ts";

import {MachineImgWrapper} from "./style.ts";
import {Content} from "../../printer/InstructionPrinter/style.ts";

import laser from "@assets/images/laser_cut.png";

import Introduction from "../Introduction";
import Usage from "../Usage";
import After from "../After";
import Preparation from "../Preparation";


const LaserImage = React.memo(() => (
    <MachineImgWrapper>
        <img src={laser} alt="레이저 커팅기"/>
    </MachineImgWrapper>
));

const InstructionLaser:FC = () => {
    const [activeIndex, setActiveIndex] = useState<number>(0);

    const {lang} = useThemeStore();

    const tabs: ITab[] = [
        { name: machineInstructionTabCategories.introduction[lang], content: <Introduction/>, },
        { name: machineInstructionTabCategories.preparation[lang], content: <Preparation/>, },
        { name: machineInstructionTabCategories.usage[lang], content: <Usage/>, },
        { name: machineInstructionTabCategories.after[lang], content: <After/>, },
    ];

    useEffect(() => {
        window.scrollTo({top: 0, behavior: "smooth"});
    }, [activeIndex]);

    return (
        <div>
            <Header leftChild={<ArrowBack/>} centerText={machineName.laser[lang]}/>
            <LaserImage/>
            <Tab type={"button"} tabs={tabs} activeIndex={activeIndex} setActiveIndex={setActiveIndex}/>
            <Content>{tabs[activeIndex].content}</Content>
        </div>
    );
};

export default React.memo(InstructionLaser);