import React, {FC, useEffect, useState} from "react";

import Header from "@components/common/Header";
import ArrowBack from "@components/common/ArrowBack";
import Tab from "@components/common/Tab";

import {ITab} from "@/types/tab.ts";
import {machineName, printerTabType} from "@constants/langCategories.ts";
import {useThemeStore} from "@store/useThemeStore.ts";

import {Content, MachineImgWrapper} from "./style.ts";

import printer from "@assets/images/3d_printer.png";

import Introduction from "../Introduction";
import Preparation from "../Preparation";
import After from "../After";
import Usage from "../Usage";

const PrinterImage = React.memo(() => (
    <MachineImgWrapper>
        <img src={printer} alt="3d 프린터"/>
    </MachineImgWrapper>
));

const InstructionPrinter:FC = () => {
    const [activeIndex, setActiveIndex] = useState<number>(0);

    const {lang} = useThemeStore();

    const tabs: ITab[] = [
        { name: printerTabType.introduction[lang], content: <Introduction/>, },
        { name: printerTabType.preparation[lang], content: <Preparation/>, },
        { name: printerTabType.usage[lang], content: <Usage/>, },
        { name: printerTabType.after[lang], content: <After/>, },
    ];

    useEffect(() => {
        window.scrollTo({top: 0, behavior: "smooth"});
    }, [activeIndex]);

    return (
        <div>
            <Header leftChild={<ArrowBack/>} centerText={machineName.printer[lang]}/>
            <PrinterImage/>
            <Tab type={"button"} tabs={tabs} activeIndex={activeIndex} setActiveIndex={setActiveIndex}/>
            <Content>{tabs[activeIndex].content}</Content>
        </div>
    );
};

export default React.memo(InstructionPrinter);