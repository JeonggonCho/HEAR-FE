import Header from "@components/Header";
import ArrowBack from "@components/ArrowBack";

const ConditionPage = () => {
    return (
        <div>
            <Header leftChild={<ArrowBack/>} centerText={"예약 현황"}/>
        </div>
    );
};

export default ConditionPage;