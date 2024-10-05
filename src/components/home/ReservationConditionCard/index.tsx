import {FC} from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Pagination, Keyboard} from "swiper/modules";

import LaserReservationConditionContent from "@components/content/LaserReservationConditionContent";
import PrinterReservationConditionContent from "@components/content/PrinterReservationConditionContent";
import HeatReservationConditionContent from "@components/content/HeatReservationConditionContent";
import SawReservationConditionContent from "@components/content/SawReservationConditionContent";
import VacuumReservationConditionContent from "@components/content/VacuumReservationConditionContent";
import CncReservationConditionContent from "@components/content/CncReservationConditionContent";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {Container} from "./style.ts";

const ReservationConditionCard:FC = () => {
    return (
        <Container>
            <Swiper
                modules={[Navigation, Pagination, Keyboard]}
                navigation
                slidesPerView={'auto'}
                pagination={{ clickable: true }}
                spaceBetween={20}
                centeredSlides={true}
                keyboard={{enabled: true}}
            >
                <SwiperSlide>
                    <LaserReservationConditionContent/>
                </SwiperSlide>
                <SwiperSlide>
                    <PrinterReservationConditionContent/>
                </SwiperSlide>
                <SwiperSlide>
                    <HeatReservationConditionContent/>
                </SwiperSlide>
                <SwiperSlide>
                    <SawReservationConditionContent/>
                </SwiperSlide>
                <SwiperSlide>
                    <VacuumReservationConditionContent/>
                </SwiperSlide>
                <SwiperSlide>
                    <CncReservationConditionContent/>
                </SwiperSlide>
            </Swiper>
        </Container>
    );
};

export default ReservationConditionCard;