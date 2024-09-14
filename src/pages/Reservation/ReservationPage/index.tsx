import {FC} from "react";

import Header from "@components/Header";
import LinkCard from "@components/LinkCard";

import {machineReservationCategories} from "@constants/machineCategories.ts";

import {Container, HeaderWrapper} from "./style.ts";

import reservation from "@assets/images/reservation.png";

const ReservationHeaderLeft = () => {
    return (
        <HeaderWrapper>
            <img src={reservation} alt="예약"/>
            <h2>예약</h2>
        </HeaderWrapper>

    );
};

const ReservationPage:FC = () => {
    return (
        <Container>
            <Header leftChild={<ReservationHeaderLeft/>}/>
            <p>예약하실 기기를 선택해주세요</p>
            <div>
                {machineReservationCategories.map((machine, index) => (
                    <LinkCard key={index} image={machine.image} name={machine.name} to={machine.link} type={"grid"}/>
                ))}
            </div>
        </Container>
    );
};

export default ReservationPage;