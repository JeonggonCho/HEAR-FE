import Header from "../../../components/Header";
import ArrowBack from "../../../components/ArrowBack";

const NoticePage = () => {
    return (
        <div>
            <Header leftChild={<ArrowBack/>} centerText={"공지사항"}/>
        </div>
    );
};

export default NoticePage;