import Header from "../../../components/Header";
import ArrowBack from "../../../components/ArrowBack";
import RoomMap from "../../../components/RoomMap";
import InputWithLabel from "../../../components/InputWithLabel";
import ColoredBtn from "../../../components/ColoredBtn";

const ReservationCnc = () => {
    return (
        <div>
            <Header leftChild={<ArrowBack/>} centerText={"CNC 예약"}/>
            <RoomMap machine={"cnc"}/>
            <form method={"post"} onSubmit={() => {}}>
                <InputWithLabel
                    label={"날 짜"}
                    type={"date"}
                    id={"cnc-reservation-date"}
                    name={"cnc-reservation-date"}
                    placeholder={"날짜를 선택해주세요"}
                    value={""}
                />
                <InputWithLabel
                    label={"시 간"}
                    type={"time"}
                    id={"laser-reservation-time"}
                    name={"laser-reservation-time"}
                    placeholder={"시간을 선택해주세요"}
                    value={""}
                />
                <ColoredBtn type={"submit"} text={"예약하기"} width={"full"} color={"primary"} btnSize={"big"}/>
            </form>
        </div>
    );
};

export default ReservationCnc;