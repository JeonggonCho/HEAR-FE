import {FC} from "react";

import Header from "@components/common/Header";

import {HeaderWrapper} from "@layouts/CommunicationLayout/style.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {navCategories} from "@constants/navCategories.ts";

import {Container} from "./style.ts";

import test from "@assets/images/test.png";

const QuizHeaderLeft = () => {
    const {lang} = useThemeStore();

    return (
        <HeaderWrapper>
            <img src={test} alt="모형제작실 교육"/>
            <h2>{navCategories.quiz[lang]}</h2>
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