import Header from "../../../components/Header";
import ArrowBack from "../../../components/ArrowBack";
import RoomMap from "../../../components/RoomMap";
import ColoredBtn from "../../../components/ColoredBtn";
import Select from "../../../components/Select";
import InputWithLabel from "../../../components/InputWithLabel";

const ReservationLaser = () => {
    return (
        <div>
            <Header leftChild={<ArrowBack/>} centerText={"레이저 커팅기 예약"}/>
            <RoomMap machine={"laser"}/>
            <form method={"post"} onSubmit={() => {}}>
                <Select
                    id={"select-laser"}
                    name={"select-laser"}
                    label={"기기 선택"}
                />
                <InputWithLabel
                    label={"날 짜"}
                    type={"date"}
                    id={"laser-reservation-date"}
                    name={"laser-reservation-date"}
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

export default ReservationLaser;