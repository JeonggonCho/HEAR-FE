import Header from "../../components/Header";

const QnaHeaderLeft = () => {
    return (
        <h2>모형제작실 문의</h2>
    );
};

const QnaPage = () => {
    return (
        <div>
            <Header leftChild={<QnaHeaderLeft/>}/>
            문의
        </div>
    );
};

export default QnaPage;