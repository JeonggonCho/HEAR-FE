import {FC} from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Pagination, Keyboard} from "swiper/modules";

import {ICarouselProps} from "@/types/componentProps.ts";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import {Container} from "./style.ts";

const Carousel:FC<ICarouselProps> = ({contents}) => {
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
                {contents.map((content, index) => (
                    <SwiperSlide key={`${index}-${content}`}>
                        {content}
                    </SwiperSlide>
                ))}
            </Swiper>
        </Container>
    );
};

export default Carousel;