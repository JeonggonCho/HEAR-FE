import Header from "../../../../components/Header";
import ArrowBack from "../../../../components/ArrowBack";
import heat from "../../../../assets/images/heat_cutter.png";
import {MachineImgWrapper} from "./style.ts";
import Tab, {ITab} from "../../../../components/Tab";
import {useState} from "react";
import {Content} from "../../printer/PrinterPage/style.ts";
import Introduction from "../Introduction";

const tabs: ITab[] = [
    { name: "소개", content: <Introduction/>, },
];

const HeatPage = () => {
    const [activeIndex, setActiveIndex] = useState<number>(0);

    return (
        <div>
            <Header leftChild={<ArrowBack/>} centerText={"열 선"}/>
            <MachineImgWrapper>
                <img src={heat} alt="열선"/>
            </MachineImgWrapper>
            <Tab tabs={tabs} activeIndex={activeIndex} setActiveIndex={setActiveIndex}/>
            <Content>{tabs[activeIndex].content}</Content>
        </div>
    );
};

export default HeatPage;