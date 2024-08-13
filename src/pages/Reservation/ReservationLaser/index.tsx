import Header from "../../../components/Header";
import ArrowBack from "../../../components/ArrowBack";
import RoomMap from "../../../components/RoomMap";

const ReservationLaser = () => {
    return (
        <div>
            <Header leftChild={<ArrowBack/>} centerText={"레이저 커팅기 예약"}/>
            <RoomMap machine={"laser"}/>
        </div>
    );
};

export default ReservationLaser;