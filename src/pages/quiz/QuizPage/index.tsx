import {FC} from "react";

import Header from "@components/common/Header";

import {HeaderWrapper} from "@layouts/CommunicationLayout/style.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {navLabels} from "@constants/langCategories.ts";

import {Container} from "./style.ts";

import test from "@assets/images/test.png";

const QuizHeaderLeft = () => {
    const {lang} = useThemeStore();

    return (
        <HeaderWrapper>
            <img src={test} alt="모형제작실 교육"/>
            <h2>{navLabels.quiz[lang]}</h2>
        </HeaderWrapper>
    );
};

const QuizPage:FC = () => {
    return (
        <Container>
            <Header leftChild={<QuizHeaderLeft/>}/>
            교육
        </Container>
    );
};

export default QuizPage;