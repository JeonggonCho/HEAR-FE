import React, {useEffect, useState} from "react";
import {Header} from "@components/common/Header";
import ArrowBack from "@components/common/ArrowBack";
import Tab from "@components/common/Tab";
import HeadTag from "@components/common/HeadTag";
import Grid from "@components/common/Grid";
import {useThemeStore} from "@store/useThemeStore.ts";
import {Content} from "../../printer/InstructionPrinter/style.ts";
import {MachineImgWrapper, Container} from "./style.ts";
import {headerCenter} from "@components/common/Header/style.ts";
import {machineName, machineInstructionTabCategories} from "@constants/machineCategories.ts";
import saw from "@assets/images/saw.png";
import {ITab} from "@/types/tab.ts";
import Warning from "../Warning";
import After from "../After";


const InstructionSaw = () => {
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
        <Container>
            <HeadTag title={machineName.saw[lang]}/>

            <Header>
                <Grid align={"center"} columns={3} style={{width: "100%"}}>
                    <Header.Left>
                        <ArrowBack/>
                    </Header.Left>
                    <Header.Center>
                        <h2 css={headerCenter}>{machineName.saw[lang]}</h2>
                    </Header.Center>
                </Grid>
            </Header>

            <MachineImgWrapper>
                <img src={saw} alt="톱"/>
            </MachineImgWrapper>
            <Tab type={"button"} tabs={tabs} activeIndex={activeIndex} setActiveIndex={setActiveIndex}/>
            <Content>{tabs[activeIndex].content}</Content>
        </Container>
    );
};

export default React.memo(InstructionSaw);