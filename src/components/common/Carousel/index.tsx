import {JSX} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Pagination, Keyboard} from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {Container} from "./style.ts";


interface ICarouselProps {
    contents: JSX.Element[];
}


const Carousel = ({contents}: ICarouselProps) => {
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