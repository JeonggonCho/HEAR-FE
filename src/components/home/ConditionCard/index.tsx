import {FC} from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Pagination, Keyboard} from "swiper/modules";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {Container} from "./style.ts";

const ConditionCard:FC = () => {
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
                    {"레이저 커팅기 예약 현황"}
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                </SwiperSlide>
                <SwiperSlide>
                    {"3D 프린터 예약 현황"}
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                </SwiperSlide>
                <SwiperSlide>
                    {"열선 예약 현황"}
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                </SwiperSlide>
                <SwiperSlide>
                    {"톱 예약 현황"}
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                </SwiperSlide>
                <SwiperSlide>
                    {"사출 성형기 예약 현황"}
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                </SwiperSlide>
                <SwiperSlide>
                    {"CNC 예약 현황"}
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                </SwiperSlide>
            </Swiper>
        </Container>
    );
};

export default ConditionCard;