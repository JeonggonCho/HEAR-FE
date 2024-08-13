import Header from "../../../components/Header";
import ArrowBack from "../../../components/ArrowBack";

const ReservationHeat = () => {
    return (
        <div>
            <Header leftChild={<ArrowBack/>} centerText={"열선 예약"}/>
            열선 예약
        </div>
    );
};

export default ReservationHeat;