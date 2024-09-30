import {FC} from "react";

import Header from "@components/common/Header";
import LinkCard from "@components/common/LinkCard";

import {Container, HeaderWrapper} from "./style.ts";

import instruction from "@assets/images/instruction.png";
import printer from "@assets/images/printer_icon.png";
import laser from "@assets/images/laser_icon.png";
import heat from "@assets/images/heat_icon.png"
import cnc from "@assets/images/cnc_icon.png";
import saw from "@assets/images/saw_icon.png";
import vacuum from "@assets/images/vacuum_icon.png"

interface IMachine {
    name: string;
    image: string;
    link: string;
}

const machines: IMachine[] = [
    {name: "레이저 커팅기", image: laser, link: "/instruction/laser"},
    {name: "3D 프린터", image: printer, link: "/instruction/3d-printer"},
    {name: "열 선", image: heat, link: "/instruction/heat"},
    {name: "톱", image: saw, link: "/instruction/saw"},
    {name: "사출 성형기", image: vacuum, link: "/instruction/vacuum"},
    {name: "CNC", image: cnc, link: "/instruction/cnc"},
];

const InstructionHeaderLeft = () => {
    return (
        <HeaderWrapper>
            <img src={instruction} alt="사용법"/>
            <h2>사용법</h2>
        </HeaderWrapper>

    );
};

const InstructionPage:FC = () => {
    return (
        <Container>
            <Header leftChild={<InstructionHeaderLeft/>}/>
            <p>사용법 및 주의사항이 궁금한 기기를 선택해주세요</p>
            <div>
                {machines.map((machine, index) => (
                    <LinkCard
                        key={index}
                        image={machine.image}
                        name={machine.name}
                        to={machine.link}
                        type={"linear"}
                    />
                ))}
            </div>
        </Container>
    );
};

export default InstructionPage;