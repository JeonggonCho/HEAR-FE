import Header from "../../../components/Header";
import ArrowBack from "../../../components/ArrowBack";

const AlarmPage = () => {
    return (
        <div>
            <Header leftChild={<ArrowBack/>} centerText={"알림"}/>
            알림 페이지
        </div>
    );
};

export default AlarmPage;