import {Container} from "./style.ts";
import Header from "@components/Header";
import {LottieWrapper} from "../../auth/SignupDonePage/style.ts";
import done from "@assets/images/done.json";
import ColoredBtn from "@components/ColoredBtn";

const ReservationDonePage = () => {
    return (
        <Container>
            <Header centerText={"예약 완료"}/>
            <LottieWrapper animationData={done}/>
            <p>예약이 <span>완료</span>되었습니다</p>
            <ColoredBtn type={"link"} to={"/"} content={"홈으로 이동"} width={"full"} color={"primary"} scale={"big"}/>
        </Container>
    );
};

export default ReservationDonePage;