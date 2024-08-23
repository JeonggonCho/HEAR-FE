import {Container, HeaderWrapper} from "./style.ts";
import Header from "@components/Header";
import MachineSelector from "@components/MachineReservationItem";
import HollowBtn from "@components/HollowBtn";
import reservation from "@assets/images/reservation.png";
import {machineCategories} from "@constants/machineCategories.ts";

const ReservationHeaderLeft = () => {
    return (
        <HeaderWrapper>
            <img src={reservation} alt="예약"/>
            <h2>예약</h2>
        </HeaderWrapper>

    );
};

const ReservationHeaderRight = () => (
    <HollowBtn
        type={"link"}
        to={"/reservation/condition"}
        content={"예약 현황"}
        width={"fit"}
        color={"primary"}
        scale={"small"}
    />
);

const ReservationPage = () => {
    return (
        <Container>
            <Header leftChild={<ReservationHeaderLeft/>} rightChild={<ReservationHeaderRight/>}/>
            <p>예약하실 기기를 선택해주세요</p>
            <div>
                {machineCategories.map((machine, index) => (
                    <MachineSelector key={index} image={machine.image} name={machine.name} to={machine.link}/>
                ))}
            </div>
        </Container>
    );
};

export default ReservationPage;