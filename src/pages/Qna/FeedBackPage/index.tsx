import {HeaderWrapper} from "./style.ts";
import Header from "../../../components/Header";
import HollowBtn from "../../../components/HollowBtn";
import qna from "../../../assets/images/qna.png";

const FeedbackHeaderLeft = () => (
    <HeaderWrapper>
        <img src={qna} alt="피드백"/>
        <h2>피드백</h2>
    </HeaderWrapper>
);

const FeedbackHeaderRight = () => (
    <HollowBtn type={"link"} text={"모형제작실 문의"} width={"fit"} color={"primary"} btnSize={"small"} to={"/inquiry"}/>
);

const FeedbackPage = () => {
    return (
        <div>
            <Header leftChild={<FeedbackHeaderLeft/>} rightChild={<FeedbackHeaderRight/>}/>
            피드백
        </div>
    );
};

export default FeedbackPage;