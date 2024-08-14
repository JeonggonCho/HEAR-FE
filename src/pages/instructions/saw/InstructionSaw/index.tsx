import Header from "../../../../components/Header";
import ArrowBack from "../../../../components/ArrowBack";
import saw from "../../../../assets/images/saw.png";
import {MachineImgWrapper} from "./style.ts";
import Tab, {ITab} from "../../../../components/Tab";
import React, {useState} from "react";
import {Content} from "../../printer/InstructionPrinter/style.ts";
import Warning from "../Warning";
import After from "../After";

const tabs: ITab[] = [
    { name: "주의사항", content: <Warning/>, },
    { name: "사용후", content: <After/>, },
];

const InstructionSaw = () => {
    const [activeIndex, setActiveIndex] = useState<number>(0);

    return (
        <div>
            <Header leftChild={<ArrowBack/>} centerText={"톱"}/>
            <MachineImgWrapper>
                <img src={saw} alt="톱"/>
            </MachineImgWrapper>
            <Tab tabs={tabs} activeIndex={activeIndex} setActiveIndex={setActiveIndex}/>
            <Content>{tabs[activeIndex].content}</Content>
        </div>
    );
};

export default React.memo(InstructionSaw);