import {useState} from "react";
import Header from "../../../../components/Header";
import ArrowBack from "../../../../components/ArrowBack";
import printer from "../../../../assets/images/3d_printer.png";
import {Content, MachineImgWrapper} from "./style.ts";
import Tab, {ITab} from "../../../../components/Tab";
import Introduction from "../Introduction";
import Preparation from "../Preparation";
import Printing from "../Printing";
import After from "../After";

const tabs: ITab[] = [
    { name: "소개", content: <Introduction/>, },
    { name: "준비", content: <Preparation/>, },
    { name: "출력", content: <Printing/>, },
    { name: "사용후", content: <After/>, },
];

const PrinterPage = () => {
    const [activeIndex, setActiveIndex] = useState<number>(0);

    return (
        <div>
            <Header leftChild={<ArrowBack/>} centerText={"3D 프린터"}/>
            <MachineImgWrapper>
                <img src={printer} alt="3d 프린터"/>
            </MachineImgWrapper>
            <Tab tabs={tabs} activeIndex={activeIndex} setActiveIndex={setActiveIndex}/>
            <Content>{tabs[activeIndex].content}</Content>
        </div>
    );
};

export default PrinterPage;