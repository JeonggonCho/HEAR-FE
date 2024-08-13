import Header from "../../../components/Header";
import ArrowBack from "../../../components/ArrowBack";
import RoomMap from "../../../components/RoomMap";
import ColoredBtn from "../../../components/ColoredBtn";

const ReservationVacuum = () => {
    return (
        <div>
            <Header leftChild={<ArrowBack/>} centerText={"사출 성형기 예약"}/>
            <RoomMap machine={"vacuum"}/>
            <form method={"post"} onSubmit={() => {}}>
                <ColoredBtn type={"submit"} text={"예약하기"} width={"full"} color={"primary"} btnSize={"big"}/>
            </form>
        </div>
    );
};

export default ReservationVacuum;