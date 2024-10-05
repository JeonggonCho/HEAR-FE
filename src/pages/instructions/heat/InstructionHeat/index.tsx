import React, {FC, useEffect, useState} from "react";

import Header from "@components/common/Header";
import ArrowBack from "@components/common/ArrowBack";
import Tab from "@components/common/Tab";

import {ITab} from "@/types/tab.ts";
import {heatTabType, machineName} from "@constants/langCategories.ts";
import {useThemeStore} from "@store/useThemeStore.ts";

import {MachineImgWrapper} from "./style.ts";

import heat from "@assets/images/heat_cutter.png";

import {Content} from "../../printer/InstructionPrinter/style.ts";
import Introduction from "../Introduction";

const InstructionHeat:FC = () => {
    const [activeIndex, setActiveIndex] = useState<number>(0);

    const {lang} = useThemeStore();

    const tabs: ITab[] = [
        { name: heatTabType.introduction[lang], content: <Introduction/>, },
    ];

    useEffect(() => {
        window.scrollTo({top: 0, behavior: "smooth"});
    }, [activeIndex]);

    return (
        <div>
            <Header leftChild={<ArrowBack/>} centerText={machineName.heat[lang]}/>
            <MachineImgWrapper>
                <img src={heat} alt="열선"/>
            </MachineImgWrapper>
            <Tab type={"button"} tabs={tabs} activeIndex={activeIndex} setActiveIndex={setActiveIndex}/>
            <Content>{tabs[activeIndex].content}</Content>
        </div>
    );
};

export default React.memo(InstructionHeat);