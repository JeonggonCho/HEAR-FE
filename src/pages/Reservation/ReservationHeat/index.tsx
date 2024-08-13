import Header from "../../../components/Header";
import ArrowBack from "../../../components/ArrowBack";
import ColoredBtn from "../../../components/ColoredBtn";

const ReservationHeat = () => {
    return (
        <div>
            <Header leftChild={<ArrowBack/>} centerText={"열선 예약"}/>
            <form method={"post"} onSubmit={() => {}}>
                <ColoredBtn type={"submit"} text={"예약하기"} width={"full"} color={"primary"} btnSize={"big"}/>
            </form>
        </div>
    );
};

export default ReservationHeat;