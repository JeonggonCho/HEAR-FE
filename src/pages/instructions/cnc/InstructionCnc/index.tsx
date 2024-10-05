import React, {useState, useEffect, FC} from "react";

import Header from "@components/common/Header";
import ArrowBack from "@components/common/ArrowBack";
import Tab from "@components/common/Tab";

import {ITab} from "@/types/tab.ts";
import {cncTabType, machineName} from "@constants/langCategories.ts";
import {useThemeStore} from "@store/useThemeStore.ts";

import {MachineImgWrapper} from "./style.ts";
import {Content} from "../../printer/InstructionPrinter/style.ts";

import cnc from "@assets/images/cnc.png";

import Introduction from "../Introduction";
import Work from "../Work";

const InstructionCnc:FC = () => {
    const [activeIndex, setActiveIndex] = useState<number>(0);

    const {lang} = useThemeStore();

    const tabs: ITab[] = [
        { name: cncTabType.introduction[lang], content: <Introduction/>, },
        { name: cncTabType.work[lang], content: <Work/>, },
    ];

    useEffect(() => {
        window.scrollTo({top: 0, behavior: "smooth"});
    }, [activeIndex]);

    return (
        <div>
            <Header leftChild={<ArrowBack/>} centerText={machineName.cnc[lang]}/>
            <MachineImgWrapper>
                <img src={cnc} alt="CNC"/>
            </MachineImgWrapper>
            <Tab type={"button"} tabs={tabs} activeIndex={activeIndex} setActiveIndex={setActiveIndex}/>
            <Content>{tabs[activeIndex].content}</Content>
        </div>
    );
};

export default React.memo(InstructionCnc);