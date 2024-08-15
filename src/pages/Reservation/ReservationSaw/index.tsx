import Header from "../../../components/Header";
import ArrowBack from "../../../components/ArrowBack";
import ColoredBtn from "../../../components/ColoredBtn";
import InputWithLabel from "../../../components/InputWithLabel";
import {Container} from "./style.ts";

const ReservationSaw = () => {
    return (
        <Container>
            <Header leftChild={<ArrowBack/>} centerText={"톱 예약"}/>
            <form method={"post"} onSubmit={() => {}}>
                <InputWithLabel
                    label={"날 짜"}
                    type={"date"}
                    id={"saw-reservation-date"}
                    name={"saw-reservation-heat-date"}
                    placeholder={"날짜를 선택해주세요"}
                    value={""}
                />
                <InputWithLabel
                    label={"시 간"}
                    type={"time"}
                    id={"saw-reservation-time"}
                    name={"saw-reservation-time"}
                    placeholder={"시간을 선택해주세요"}
                    value={""}
                />
                <ColoredBtn type={"submit"} text={"예약하기"} width={"full"} color={"primary"} btnSize={"big"}/>
            </form>
        </Container>
    );
};

export default ReservationSaw;