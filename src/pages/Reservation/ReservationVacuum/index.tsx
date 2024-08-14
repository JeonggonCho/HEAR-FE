import Header from "../../../components/Header";
import ArrowBack from "../../../components/ArrowBack";
import RoomMap from "../../../components/RoomMap";
import ColoredBtn from "../../../components/ColoredBtn";
import InputWithLabel from "../../../components/InputWithLabel";

const ReservationVacuum = () => {
    return (
        <div>
            <Header leftChild={<ArrowBack/>} centerText={"사출 성형기 예약"}/>
            <RoomMap machine={"vacuum"}/>
            <form method={"post"} onSubmit={() => {}}>
                <InputWithLabel
                    label={"날 짜"}
                    type={"date"}
                    id={"vacuum-reservation-date"}
                    name={"vacuum-reservation-heat-date"}
                    placeholder={"날짜를 선택해주세요"}
                    value={""}
                />
                <InputWithLabel
                    label={"시 간"}
                    type={"time"}
                    id={"vacuum-reservation-time"}
                    name={"vacuum-reservation-time"}
                    placeholder={"시간을 선택해주세요"}
                    value={""}
                />
                <ColoredBtn type={"submit"} text={"예약하기"} width={"full"} color={"primary"} btnSize={"big"}/>
            </form>
        </div>
    );
};

export default ReservationVacuum;