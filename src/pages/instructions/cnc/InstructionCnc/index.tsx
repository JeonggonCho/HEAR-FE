import React, {useState, useEffect} from "react";
import {Header} from "@components/common/Header";
import HeadTag from "@components/common/HeadTag";
import Grid from "@components/common/Grid";
import ArrowBack from "@components/common/ArrowBack";
import Tab from "@components/common/Tab";
import {useThemeStore} from "@store/useThemeStore.ts";
import {Container, MachineImgWrapper} from "./style.ts";
import {headerCenter} from "@components/common/Header/style.ts";
import {Content} from "../../printer/InstructionPrinter/style.ts";
import {machineName, machineInstructionTabCategories} from "@constants/machineCategories.ts";
import Introduction from "../Introduction";
import Work from "../Work";
import cnc from "@assets/images/cnc.png";
import {ITab} from "@/types/tab.ts";


const InstructionCnc = () => {
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

            <Header>
                <Grid align={"center"} columns={3} style={{width: "100%"}}>
                    <Header.Left>
                        <ArrowBack/>
                    </Header.Left>
                    <Header.Center>
                        <h2 css={headerCenter}>{machineName.cnc[lang]}</h2>
                    </Header.Center>
                </Grid>
            </Header>

            <MachineImgWrapper>
                <img src={cnc} alt="CNC"/>
            </MachineImgWrapper>
            <Tab type={"button"} tabs={tabs} activeIndex={activeIndex} setActiveIndex={setActiveIndex}/>
            <Content>{tabs[activeIndex].content}</Content>
        </Container>
    );
};

export default React.memo(InstructionCnc);