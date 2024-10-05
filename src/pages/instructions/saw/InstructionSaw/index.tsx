import React, {FC, useEffect, useState} from "react";

import Header from "@components/common/Header";
import ArrowBack from "@components/common/ArrowBack";
import Tab from "@components/common/Tab";

import {ITab} from "@/types/tab.ts";
import {machineName, machineInstructionTabCategories} from "@constants/machineCategories.ts";
import {useThemeStore} from "@store/useThemeStore.ts";

import {Content} from "../../printer/InstructionPrinter/style.ts";
import {MachineImgWrapper} from "./style.ts";

import saw from "@assets/images/saw.png";

import Warning from "../Warning";
import After from "../After";

const InstructionSaw:FC = () => {
    const [activeIndex, setActiveIndex] = useState<number>(0);

    const {lang} = useThemeStore();

    const tabs: ITab[] = [
        { name: machineInstructionTabCategories.precaution[lang], content: <Warning/>, },
        { name: machineInstructionTabCategories.after[lang], content: <After/>, },
    ];

    useEffect(() => {
        window.scrollTo({top: 0, behavior: "smooth"});
    }, [activeIndex]);

    return (
        <div>
            <Header leftChild={<ArrowBack/>} centerText={machineName.saw[lang]}/>
            <MachineImgWrapper>
                <img src={saw} alt="톱"/>
            </MachineImgWrapper>
            <Tab type={"button"} tabs={tabs} activeIndex={activeIndex} setActiveIndex={setActiveIndex}/>
            <Content>{tabs[activeIndex].content}</Content>
        </div>
    );
};

export default React.memo(InstructionSaw);