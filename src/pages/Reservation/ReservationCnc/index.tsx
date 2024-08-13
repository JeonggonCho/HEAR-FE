import Header from "../../../components/Header";
import ArrowBack from "../../../components/ArrowBack";
import RoomMap from "../../../components/RoomMap";

const ReservationCnc = () => {
    return (
        <div>
            <Header leftChild={<ArrowBack/>} centerText={"CNC 예약"}/>
            <RoomMap machine={"cnc"}/>
        </div>
    );
};

export default ReservationCnc;