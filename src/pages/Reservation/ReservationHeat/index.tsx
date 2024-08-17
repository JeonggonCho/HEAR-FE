import Header from "../../../components/Header";
import ArrowBack from "../../../components/ArrowBack";
import ColoredBtn from "../../../components/ColoredBtn";
import InputWithLabel from "../../../components/InputWithLabel";
import {Container} from "./style.ts";

const ReservationHeat = () => {
    return (
        <Container>
            <Header leftChild={<ArrowBack/>} centerText={"열선 예약"}/>
            <form method={"post"} onSubmit={(e) => {
                e.preventDefault();
            }}>
                <InputWithLabel
                    label={"날 짜"}
                    type={"date"}
                    id={"heat-reservation-date"}
                    name={"heat-reservation-heat-date"}
                    placeholder={"날짜를 선택해주세요"}
                    value={""}
                />
                <InputWithLabel
                    label={"시 간"}
                    type={"time"}
                    id={"heat-reservation-time"}
                    name={"heat-reservation-time"}
                    placeholder={"시간을 선택해주세요"}
                    value={""}
                />
                <ColoredBtn type={"submit"} text={"예약하기"} width={"full"} color={"primary"} btnSize={"big"}/>
            </form>
        </Container>
    );
};

export default ReservationHeat;