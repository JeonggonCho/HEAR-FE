import Header from "../../../components/Header";
import ArrowBack from "../../../components/ArrowBack";

const FeedBackPage = () => {
    return (
        <div>
            <Header leftChild={<ArrowBack/>} centerText={"어플리케이션 피드백"}/>
        </div>
    );
};

export default FeedBackPage;