import {FC} from "react";

import Header from "@components/common/Header";
import ArrowBack from "@components/common/ArrowBack";

import {headerCategories} from "@constants/headerCategories.ts";
import {useThemeStore} from "@store/useThemeStore.ts";

import {Container} from "./style.ts";


const UpdatePasswordPage:FC = () => {
    const {lang} = useThemeStore();

    return (
        <Container>
            <Header leftChild={<ArrowBack/>} centerText={headerCategories.passwordChange[lang]}/>
        </Container>
    );
};

export default UpdatePasswordPage;