import Header from "../../../components/Header";
import ArrowBack from "../../../components/ArrowBack";
import RoomMap from "../../../components/RoomMap";
import ColoredBtn from "../../../components/ColoredBtn";
import InputWithLabel from "../../../components/InputWithLabel";
import Select from "../../../components/Select";
import {Container} from "./style.ts";

const ReservationPrinter = () => {
    return (
        <Container>
            <Header leftChild={<ArrowBack/>} centerText={"3D 프린터 예약"}/>
            <RoomMap machine={"printer"}/>
            <form method={"post"} onSubmit={() => {}}>
                <Select
                    label={"기기 선택"}
                    categories={[{}]}
                />
                <InputWithLabel
                    label={"날 짜"}
                    type={"date"}
                    id={"printer-reservation-date"}
                    name={"printer-reservation-date"}
                    placeholder={"날짜를 선택해주세요"}
                    value={""}
                />
                <InputWithLabel
                    label={"출력 예상 소요 시간 (시:분)"}
                    type={"time"}
                    id={"required-time"}
                    name={"required-time"}
                    placeholder={"출력 예상 소요 시간을 입력해주세요"}
                    value={""}
                />
                <ColoredBtn type={"submit"} text={"예약하기"} width={"full"} color={"primary"} btnSize={"big"}/>
            </form>
        </Container>
    );
};

export default ReservationPrinter;