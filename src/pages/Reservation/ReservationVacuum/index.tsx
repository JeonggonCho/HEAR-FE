import Header from "../../../components/Header";
import ArrowBack from "../../../components/ArrowBack";
import RoomMap from "../../../components/RoomMap";

const ReservationVacuum = () => {
    return (
        <div>
            <Header leftChild={<ArrowBack/>} centerText={"사출 성형기 예약"}/>
            <RoomMap machine={"vacuum"}/>
        </div>
    );
};

export default ReservationVacuum;