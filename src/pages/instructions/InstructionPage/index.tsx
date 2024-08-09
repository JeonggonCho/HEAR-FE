import {Container} from "./style.ts";
import Header from "../../../components/Header";
import MachineSelector from "../../../components/MachineSelector";
import printer from "../../../assets/images/3d_printer.png";
import laser from "../../../assets/images/laser_cut.png";
import heat from "../../../assets/images/heat_cutter.png"
import cnc from "../../../assets/images/cnc.png";
import saw from "../../../assets/images/saw.png";
import vacuum from "../../../assets/images/vacuum.png"

interface Machine {
    name: string;
    image: string;
    link: string;
}

const machines: Machine[] = [
    {name: "3D 프린터", image: printer, link: "/instruction/3d-printer"},
    {name: "레이저 커팅기", image: laser, link: "/instruction/laser"},
    {name: "열 선", image: heat, link: "/instruction/heat"},
    {name: "CNC", image: cnc, link: "/instruction/cnc"},
    {name: "톱", image: saw, link: "/instruction/saw"},
    {name: "사출 성형기", image: vacuum, link: "/instruction/vacuum"}
];

const InstructionHeaderLeft = () => {
    return (
        <h2>사용법</h2>
    );
};

const InstructionPage = () => {
    return (
        <Container>
            <Header leftChild={<InstructionHeaderLeft/>}/>
            <p>사용법이 궁금한 기기를 선택해주세요</p>
            <div>
                {machines.map((machine, index) => (
                    <MachineSelector key={index} image={machine.image} name={machine.name} to={machine.link}/>
                ))}
            </div>
        </Container>
    );
};

export default InstructionPage;