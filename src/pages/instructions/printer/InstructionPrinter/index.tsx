import React, {useEffect, useState} from "react";
import {Header} from "@components/common/Header";
import HeadTag from "@components/common/HeadTag";
import Grid from "@components/common/Grid";
import ArrowBack from "@components/common/ArrowBack";
import Tab from "@components/common/Tab";
import {useThemeStore} from "@store/useThemeStore.ts";
import {ITab} from "@/types/tab.ts";
import {Container, Content, MachineImgWrapper} from "./style.ts";
import {headerCenter} from "@components/common/Header/style.ts";
import {machineInstructionTabCategories} from "@constants/machineCategories.ts";
import {machineName} from "@constants/machineCategories.ts";
import Introduction from "../Introduction";
import Preparation from "../Preparation";
import After from "../After";
import Usage from "../Usage";
import printer from "@assets/images/3d_printer.png";


const PrinterImage = React.memo(() => (
    <MachineImgWrapper>
        <img src={printer} alt="3d 프린터"/>
    </MachineImgWrapper>
));


const InstructionPrinter = () => {
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
        <Container>
            <HeadTag title={machineName.printer[lang]}/>

            <Header>
                <Grid align={"center"} columns={3} style={{width: "100%"}}>
                    <Header.Left>
                        <ArrowBack/>
                    </Header.Left>
                    <Header.Center>
                        <h2 css={headerCenter}>{machineName.printer[lang]}</h2>
                    </Header.Center>
                </Grid>
            </Header>

            <PrinterImage/>
            <Tab type={"button"} tabs={tabs} activeIndex={activeIndex} setActiveIndex={setActiveIndex}/>
            <Content>{tabs[activeIndex].content}</Content>
        </Container>
    );
};

export default React.memo(InstructionPrinter);