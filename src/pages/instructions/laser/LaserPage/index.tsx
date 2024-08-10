import Header from "../../../../components/Header";
import ArrowBack from "../../../../components/ArrowBack";
import laser from "../../../../assets/images/laser_cut.png";
import {MachineImgWrapper} from "./style.ts";
import Tab, {ITab} from "../../../../components/Tab";
import Introduction from "../../printer/Introduction";
import {useState} from "react";
import Preparation from "../../printer/Preparation";
import {Content} from "../../printer/PrinterPage/style.ts";

const tabs: ITab[] = [
    { name: "소개", content: <Introduction/>, },
    { name: "준비", content: <Preparation/>, },
    { name: "출력", content: <Introduction/>, },
    { name: "사용후", content: <Preparation/>, },
];

const LaserPage = () => {
    const [activeIndex, setActiveIndex] = useState<number>(0);

    return (
        <div>
            <Header leftChild={<ArrowBack/>} centerText={"레이저 커팅기"}/>
            <MachineImgWrapper>
                <img src={laser} alt="레이저 커팅기"/>
            </MachineImgWrapper>
            <Tab tabs={tabs} activeIndex={activeIndex} setActiveIndex={setActiveIndex}/>
            <Content>{tabs[activeIndex].content}</Content>
        </div>
    );
};

export default LaserPage;