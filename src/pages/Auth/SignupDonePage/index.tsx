import {FC} from "react";

import Header from "@components/common/Header";
import Button from "@components/common/Button";

import {Container, LottieWrapper} from "./style.ts";
import done from "@assets/images/done.json";

const SignupDonePage:FC = () => {
    return (
        <Container>
            <Header centerText={"회원가입 완료"}/>
            <LottieWrapper animationData={done}/>
            <p>회원가입이 <span>완료</span>되었습니다</p>
            <Button type={"link"} to={"/"} content={"홈으로 이동"} width={"full"} color={"primary"} scale={"big"}/>
        </Container>
    );
};

export default SignupDonePage;