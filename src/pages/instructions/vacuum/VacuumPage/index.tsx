import Header from "../../../../components/Header";
import ArrowBack from "../../../../components/ArrowBack";
import vacuum from "../../../../assets/images/vacuum.png";
import {MachineImgWrapper} from "./style.ts";
import Tab, {ITab} from "../../../../components/Tab";
import Introduction from "../../printer/Introduction";
import Preparation from "../../printer/Preparation";
import {useState} from "react";
import {Content} from "../../printer/PrinterPage/style.ts";

const tabs: ITab[] = [
    { name: "소개", content: <Introduction/>, },
    { name: "준비", content: <Preparation/>, },
    { name: "출력", content: <Introduction/>, },
    { name: "사용후", content: <Preparation/>, },
];

const VacuumPage = () => {
    const [activeIndex, setActiveIndex] = useState<number>(0);

    return (
        <div>
            <Header leftChild={<ArrowBack/>} centerText={"사출 성형기"}/>
            <MachineImgWrapper>
                <img src={vacuum} alt="사출 성형기"/>
            </MachineImgWrapper>
            <Tab tabs={tabs} activeIndex={activeIndex} setActiveIndex={setActiveIndex}/>
            <Content>{tabs[activeIndex].content}</Content>
        </div>
    );
};

export default VacuumPage;