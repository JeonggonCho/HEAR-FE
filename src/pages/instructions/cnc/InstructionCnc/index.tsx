import React, {useState, useEffect, FC} from "react";

import Header from "@components/common/Header";
import ArrowBack from "@components/common/ArrowBack";
import Tab from "@components/common/Tab";
import HeadTag from "@components/common/HeadTag";

import {ITab} from "@/types/tab.ts";
import {machineName, machineInstructionTabCategories} from "@constants/machineCategories.ts";
import {useThemeStore} from "@store/useThemeStore.ts";

import {Container, MachineImgWrapper} from "./style.ts";
import {Content} from "../../printer/InstructionPrinter/style.ts";

import cnc from "@assets/images/cnc.png";

import Introduction from "../Introduction";
import Work from "../Work";

const InstructionCnc:FC = () => {
    const [activeIndex, setActiveIndex] = useState<number>(0);

    const {lang} = useThemeStore();

    const tabs: ITab[] = [
        { name: machineInstructionTabCategories.introduction[lang], content: <Introduction/>, },
        { name: machineInstructionTabCategories.work[lang], content: <Work/>, },
    ];

    useEffect(() => {
        window.scrollTo({top: 0, behavior: "smooth"});
    }, [activeIndex]);

    return (
        <Container>
            <HeadTag title={machineName.cnc[lang]}/>

            <Header leftChild={<ArrowBack/>} centerText={machineName.cnc[lang]}/>
            <MachineImgWrapper>
                <img src={cnc} alt="CNC"/>
            </MachineImgWrapper>
            <Tab type={"button"} tabs={tabs} activeIndex={activeIndex} setActiveIndex={setActiveIndex}/>
            <Content>{tabs[activeIndex].content}</Content>
        </Container>
    );
};

export default React.memo(InstructionCnc);