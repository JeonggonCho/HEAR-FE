import {FC} from "react";

import Header from "@components/common/Header";
import ArrowBack from "@components/common/ArrowBack";
import HeadTag from "@components/common/HeadTag";

import {headerCategories} from "@constants/headerCategories.ts";
import {useThemeStore} from "@store/useThemeStore.ts";

import {Container} from "./style.ts";

const UpdatePasswordPage:FC = () => {
    const {lang} = useThemeStore();

    return (
        <Container>
            <HeadTag title={headerCategories.passwordChange[lang]}/>

            <Header leftChild={<ArrowBack/>} centerText={headerCategories.passwordChange[lang]}/>
        </Container>
    );
};

export default UpdatePasswordPage;