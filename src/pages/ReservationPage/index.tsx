import {Container} from "./style.ts";
import Header from "../../components/Header";
import MachineSelector from "../../components/MachineSelector";
import printer from "../../assets/images/3d_printer.png";
import laser from "../../assets/images/laser_cut.png";
import heat from "../../assets/images/heat_cutter.png";
import cnc from "../../assets/images/cnc.png";
import saw from "../../assets/images/saw.png";
import vacuum from "../../assets/images/vacuum.png";

interface Machine {
    name: string;
    image: string;
    link: string;
}

const machines: Machine[] = [
    {name: "3D 프린터", image: printer, link: "/reservation/3d-printer"},
    {name: "레이저 커팅기", image: laser, link: "/reservation/laser"},
    {name: "열 선", image: heat, link: "/reservation/heat"},
    {name: "CNC", image: cnc, link: "/reservation/cnc"},
    {name: "톱", image: saw, link: "/reservation/saw"},
    {name: "사출 성형기", image: vacuum, link: "/reservation/vacuum"}
];

const ReservationHeaderLeft = () => {
    return (
        <h2>예약</h2>
    );
};

const ReservationPage = () => {
    return (
        <Container>
            <Header leftChild={<ReservationHeaderLeft/>}/>
            <p>예약하실 기기를 선택해주세요</p>
            <div>
                {machines.map((machine, index) => (
                    <MachineSelector key={index} image={machine.image} name={machine.name} to={machine.link}/>
                ))}
            </div>
        </Container>
    );
};

export default ReservationPage;