import Header from "../../../components/Header";
import ArrowBack from "../../../components/ArrowBack";
import RoomMap from "../../../components/RoomMap";
import ColoredBtn from "../../../components/ColoredBtn";

const ReservationLaser = () => {
    return (
        <div>
            <Header leftChild={<ArrowBack/>} centerText={"레이저 커팅기 예약"}/>
            <RoomMap machine={"laser"}/>
            <form method={"post"} onSubmit={() => {}}>
                <ColoredBtn type={"submit"} text={"예약하기"} width={"full"} color={"primary"} btnSize={"big"}/>
            </form>
        </div>
    );
};

export default ReservationLaser;