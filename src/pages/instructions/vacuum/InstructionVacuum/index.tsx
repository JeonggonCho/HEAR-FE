import Header from "@components/Header";
import ArrowBack from "@components/ArrowBack";
import vacuum from "@assets/images/vacuum.png";
import {MachineImgWrapper} from "./style.ts";
import Tab from "@components/Tab";
import React, {useEffect, useState} from "react";
import {Content} from "../../printer/InstructionPrinter/style.ts";
import Introduction from "../Introduction";
import Preparation from "../Preparation";
import Usage from "../Usage";
import {ITab} from "@/types/tab.ts";

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

const InstructionVacuum = () => {
    const [activeIndex, setActiveIndex] = useState<number>(0);

    useEffect(() => {
        window.scrollTo({top: 0, behavior: "smooth"});
    }, [activeIndex]);

    return (
        <div>
            <Header leftChild={<ArrowBack/>} centerText={"사출 성형기"}/>
            <VacuumImage/>
            <Tab tabs={tabs} activeIndex={activeIndex} setActiveIndex={setActiveIndex}/>
            <Content>{tabs[activeIndex].content}</Content>
        </div>
    );
};

export default React.memo(InstructionVacuum);