import Header from "../../../components/Header";
import ArrowBack from "../../../components/ArrowBack";

const FeedBackPage = () => {
    return (
        <div>
            <Header leftChild={<ArrowBack/>} centerText={"앱 피드백 작성"}/>
        </div>
    );
};

export default FeedBackPage;