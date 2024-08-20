import Header from "@components/Header";
import {Container} from "./style.ts";
import {HeaderWrapper} from "../../qna/InquiryPage/style.ts";
import test from "@assets/images/test.png";

const TestHeaderLeft = () => (
    <HeaderWrapper>
        <img src={test} alt="모형제작실 교육"/>
        <h2>교육</h2>
    </HeaderWrapper>
);

const TestPage = () => {
    return (
        <Container>
            <Header leftChild={<TestHeaderLeft/>}/>
            교육
        </Container>
    );
};

export default TestPage;