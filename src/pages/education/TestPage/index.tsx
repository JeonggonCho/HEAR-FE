import {FC} from "react";

import Header from "@components/common/Header";
import HeadTag from "@components/common/HeadTag";

import {useThemeStore} from "@store/useThemeStore.ts";
import {navCategories} from "@constants/navCategories.ts";

import {Container, HeaderWrapper} from "./style.ts";

import test from "@assets/images/test.png";


const TestHeaderLeft = () => {
    const {lang} = useThemeStore();

    return (
        <HeaderWrapper>
            <img src={test} alt="모형제작실 교육"/>
            <h2>{navCategories.test[lang]}</h2>
        </HeaderWrapper>
    );
};


const TestPage:FC = () => {
    const {lang} = useThemeStore();

    return (
        <Container>
            <HeadTag title={navCategories.test[lang]}/>

            <Header leftChild={<TestHeaderLeft/>} type={"flex"}/>
            교육
        </Container>
    );
};

export default TestPage;