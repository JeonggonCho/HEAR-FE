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
                <InputWithLabel label={"날 짜"} type={"date"}/>
                <InputWithLabel label={"날 짜"} type={"date"}/>
                <ColoredBtn type={"submit"} text={"예약하기"} width={"full"} color={"primary"} btnSize={"big"}/>
            </form>
        </div>
    );
};

export default ReservationCnc;