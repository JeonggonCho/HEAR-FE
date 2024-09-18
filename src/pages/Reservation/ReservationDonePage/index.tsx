import {FC} from "react";

import Header from "@components/Header";
import Button from "@components/Button";

import {Container, LottieWrapper} from "./style.ts";

import done from "@assets/images/done.json";

const ReservationDonePage:FC = () => {
    return (
        <Container>
            <Header centerText={"예약 완료"}/>
            <LottieWrapper animationData={done}/>
            <p>예약이 <span>완료</span>되었습니다</p>
            <Button type={"link"} to={"/"} content={"홈으로 이동"} width={"full"} color={"primary"} scale={"big"}/>
        </Container>
    );
};

export default ReservationDonePage;