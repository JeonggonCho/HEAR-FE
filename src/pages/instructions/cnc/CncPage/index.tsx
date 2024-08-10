import Header from "../../../../components/Header";
import ArrowBack from "../../../../components/ArrowBack";
import cnc from "../../../../assets/images/cnc.png";
import {MachineImgWrapper} from "./style.ts";
import Tab, {ITab} from "../../../../components/Tab";
import Introduction from "../../printer/Introduction";
import Preparation from "../../printer/Preparation";
import {Content} from "../../printer/PrinterPage/style.ts";
import {useState} from "react";

const tabs: ITab[] = [
    { name: "소개", content: <Introduction/>, },
    { name: "준비", content: <Preparation/>, },
    { name: "출력", content: <Introduction/>, },
    { name: "사용후", content: <Preparation/>, },
];

const CncPage = () => {
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

export default CncPage;