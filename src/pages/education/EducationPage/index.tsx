import {FC} from "react";

import Header from "@components/common/Header";
import HeadTag from "@components/common/HeadTag";

import {useThemeStore} from "@store/useThemeStore.ts";
import {navCategories} from "@constants/navCategories.ts";

import {Container, HeaderWrapper} from "./style.ts";

import test from "@assets/images/test.png";

const EducationHeaderLeft = () => {
    const {lang} = useThemeStore();

    return (
        <HeaderWrapper>
            <img src={test} alt="모형제작실 교육"/>
            <h2>{navCategories.edu[lang]}</h2>
        </HeaderWrapper>
    );
};

const EducationPage:FC = () => {
    const {lang} = useThemeStore();

    return (
        <Container>
            <HeadTag title={navCategories.edu[lang]}/>

            <Header leftChild={<EducationHeaderLeft/>} type={"flex"}/>
            교육
        </Container>
    );
};

export default EducationPage;