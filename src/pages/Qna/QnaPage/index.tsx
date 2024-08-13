import Header from "../../../components/Header";
import qna from "../../../assets/images/qna.png";
import {HeaderWrapper} from "./style.ts";

const QnaHeaderLeft = () => {
    return (
        <HeaderWrapper>
            <img src={qna} alt="모형제작실 문의"/>
            <h2>모형제작실 문의</h2>
        </HeaderWrapper>
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