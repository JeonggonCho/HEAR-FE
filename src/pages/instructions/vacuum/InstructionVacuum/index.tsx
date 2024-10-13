import React, {FC, useEffect, useState} from "react";

import Header from "@components/common/Header";
import ArrowBack from "@components/common/ArrowBack";
import Tab from "@components/common/Tab";
import HeadTag from "@components/common/HeadTag";

import {ITab} from "@/types/tab.ts";
import {machineName, machineInstructionTabCategories} from "@constants/machineCategories.ts";
import {useThemeStore} from "@store/useThemeStore.ts";

import {Container, MachineImgWrapper} from "./style.ts";
import {Content} from "../../printer/InstructionPrinter/style.ts";

import vacuum from "@assets/images/vacuum.png";

import Introduction from "../Introduction";
import Preparation from "../Preparation";
import Usage from "../Usage";

const VacuumImage = React.memo(() => (
    <MachineImgWrapper>
        <img src={vacuum} alt="사출 성형기"/>
    </MachineImgWrapper>
));

const InstructionVacuum:FC = () => {
    const [activeIndex, setActiveIndex] = useState<number>(0);

    const {lang} = useThemeStore();

    const tabs: ITab[] = [
        { name: machineInstructionTabCategories.introduction[lang], content: <Introduction/>, },
        { name: machineInstructionTabCategories.preparation[lang], content: <Preparation/>, },
        { name: machineInstructionTabCategories.usage[lang], content: <Usage/>, },
    ];

    useEffect(() => {
        window.scrollTo({top: 0, behavior: "smooth"});
    }, [activeIndex]);

    return (
        <Container>
            <HeadTag title={machineName.vacuum[lang]}/>

            <Header leftChild={<ArrowBack/>} centerText={machineName.vacuum[lang]}/>
            <VacuumImage/>
            <Tab type={"button"} tabs={tabs} activeIndex={activeIndex} setActiveIndex={setActiveIndex}/>
            <Content>{tabs[activeIndex].content}</Content>
        </Container>
    );
};

export default React.memo(InstructionVacuum);