import Header from "../../../../components/Header";
import ArrowBack from "../../../../components/ArrowBack";
import cnc from "../../../../assets/images/cnc.png";
import {MachineImgWrapper} from "./style.ts";
import Tab, {ITab} from "../../../../components/Tab";
import {Content} from "../../printer/InstructionPrinter/style.ts";
import {useState} from "react";
import Introduction from "../Introduction";

const tabs: ITab[] = [
    { name: "소개", content: <Introduction/>, },
];

const InstructionCnc = () => {
    const [activeIndex, setActiveIndex] = useState<number>(0);

    return (
        <div>
            <Header leftChild={<ArrowBack/>} centerText={"CNC"}/>
            <MachineImgWrapper>
                <img src={cnc} alt="CNC"/>
            </MachineImgWrapper>
            <Tab tabs={tabs} activeIndex={activeIndex} setActiveIndex={setActiveIndex}/>
            <Content>{tabs[activeIndex].content}</Content>        </div>
    );
};

export default InstructionCnc;