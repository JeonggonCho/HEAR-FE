import Header from "@components/Header";
import done from "@assets/images/done.json";
import {Container, LottieWrapper} from "./style.ts";
import ColoredBtn from "@components/ColoredBtn";

const SignupDonePage = () => {
    return (
        <Container>
            <Header centerText={"회원가입 완료"}/>
            <LottieWrapper animationData={done}/>
            <p>회원가입이 <span>완료</span>되었습니다</p>
            <ColoredBtn type={"link"} to={"/"} text={"홈으로 이동"} width={"full"} color={"primary"} scale={"big"}/>
        </Container>
    );
};

export default SignupDonePage;