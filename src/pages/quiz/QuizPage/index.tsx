import {FC} from "react";

import Header from "@components/Header";

import {HeaderWrapper} from "@pages/inquiry/InquiryPage/style.ts";

import {Container} from "./style.ts";

import test from "@assets/images/test.png";

const QuizHeaderLeft = () => (
    <HeaderWrapper>
        <img src={test} alt="모형제작실 교육"/>
        <h2>교육</h2>
    </HeaderWrapper>
);

const QuizPage:FC = () => {
    return (
        <Container>
            <Header leftChild={<QuizHeaderLeft/>}/>
            교육
        </Container>
    );
};

export default QuizPage;