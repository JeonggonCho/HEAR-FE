import Header from "../../../components/Header";
import ArrowBack from "../../../components/ArrowBack";
import RoomMap from "../../../components/RoomMap";

const ReservationPrinter = () => {
    return (
        <div>
            <Header leftChild={<ArrowBack/>} centerText={"3D 프린터 예약"}/>
            <RoomMap machine={"printer"}/>
        </div>
    );
};

export default ReservationPrinter;