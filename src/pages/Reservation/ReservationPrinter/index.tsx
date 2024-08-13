import Header from "../../../components/Header";
import ArrowBack from "../../../components/ArrowBack";
import RoomMap from "../../../components/RoomMap";
import ColoredBtn from "../../../components/ColoredBtn";

const ReservationPrinter = () => {
    return (
        <div>
            <Header leftChild={<ArrowBack/>} centerText={"3D 프린터 예약"}/>
            <RoomMap machine={"printer"}/>
            <form method={"post"} onSubmit={() => {}}>
                <ColoredBtn type={"submit"} text={"예약하기"} width={"full"} color={"primary"} btnSize={"big"}/>
            </form>
        </div>
    );
};

export default ReservationPrinter;