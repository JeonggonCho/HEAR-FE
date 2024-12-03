import React, {useEffect, useState} from "react";
import {Header} from "@components/common/Header";
import HeadTag from "@components/common/HeadTag";
import Grid from "@components/common/Grid";
import ArrowBack from "@components/common/ArrowBack";
import Tab from "@components/common/Tab";
import {useThemeStore} from "@store/useThemeStore.ts";
import {ITab} from "@/types/tab.ts";
import {Container, MachineImgWrapper} from "./style.ts";
import {Content} from "../../printer/InstructionPrinter/style.ts";
import {headerCenter} from "@components/common/Header/style.ts";
import {machineName, machineInstructionTabCategories} from "@constants/machineCategories.ts";
import Introduction from "../Introduction";
import Preparation from "../Preparation";
import Usage from "../Usage";
import vacuum from "@assets/images/vacuum.png";


const VacuumImage = React.memo(() => (
    <MachineImgWrapper>
        <img src={vacuum} alt="사출 성형기"/>
    </MachineImgWrapper>
));


const InstructionVacuum = () => {
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

            <Header>
                <Grid align={"center"} columns={3} style={{width: "100%"}}>
                    <Header.Left>
                        <ArrowBack/>
                    </Header.Left>
                    <Header.Center>
                        <h2 css={headerCenter}>{machineName.vacuum[lang]}</h2>
                    </Header.Center>
                </Grid>
            </Header>

            <VacuumImage/>
            <Tab type={"button"} tabs={tabs} activeIndex={activeIndex} setActiveIndex={setActiveIndex}/>
            <Content>{tabs[activeIndex].content}</Content>
        </Container>
    );
};

export default React.memo(InstructionVacuum);