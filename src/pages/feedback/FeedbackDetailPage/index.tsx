import Header from "@components/Header";
import ArrowBack from "@components/ArrowBack";

const FeedbackDetailPage = () => {
    return (
        <div>
            <Header leftChild={<ArrowBack/>} centerText={"피드백"}/>
        </div>
    );
};

export default FeedbackDetailPage;