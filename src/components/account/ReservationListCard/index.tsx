import {FC} from 'react';

import {cardCategories} from "@constants/cardCategories.ts";
import {useThemeStore} from "@store/useThemeStore.ts";

import {Container, Reservation} from "./style.ts";

import myReservation from "@assets/images/my_reservation.png";

const ReservationListCard:FC = () => {
    const {lang} = useThemeStore();

    return (
        <Container>
            <div>
                <img src={myReservation} alt="나의 예약"/>
                <h3>{cardCategories.myReservation[lang]}</h3>
            </div>

            <div>
                <Reservation to={"/"}>
                    <span>3D 프린터 1호기</span>
                    <span>2024.07.30</span>
                </Reservation>
                <Reservation to={"/"}>
                    <span>3D 프린터 2호기</span>
                    <span>2024.07.26</span>
                </Reservation>
                <Reservation to={"/"}>
                    <span>레이저 커팅기 1호기</span>
                    <span>2024.07.20</span>
                </Reservation>
            </div>
        </Container>
    );
};

export default ReservationListCard;