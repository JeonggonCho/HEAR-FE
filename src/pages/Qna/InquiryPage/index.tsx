import Header from "../../../components/Header";
import qna from "../../../assets/images/qna.png";
import {Container, CreateBtn, CreateBtnWrapper, HeaderWrapper} from "./style.ts";
import HollowBtn from "../../../components/HollowBtn";
import write from "../../../assets/icons/write.svg";
import {ReactSVG} from "react-svg";

const InquiryHeaderLeft = () => (
    <HeaderWrapper>
        <img src={qna} alt="모형제작실 문의"/>
        <h2>모형제작실 문의</h2>
    </HeaderWrapper>
);


const InquiryHeaderRight = () => (
    <HollowBtn type={"link"} text={"피드백"} width={"fit"} color={"primary"} btnSize={"small"} to={"/feedback"}/>
);

const InquiryPage = () => {
    return (
        <Container>
            <Header leftChild={<InquiryHeaderLeft/>} rightChild={<InquiryHeaderRight/>}/>
            문의
            <CreateBtnWrapper>
                <CreateBtn to={"/inquiry/new"}>
                    <ReactSVG src={write}/>
                </CreateBtn>
            </CreateBtnWrapper>
        </Container>
    );
};

export default InquiryPage;