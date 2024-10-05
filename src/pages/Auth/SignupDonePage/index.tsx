import {FC} from "react";

import Header from "@components/common/Header";
import Button from "@components/common/Button";

import {messageCategories} from "@constants/messageCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {headerCategories} from "@constants/headerCategories.ts";
import {useThemeStore} from "@store/useThemeStore.ts";

import {Container, LottieWrapper} from "./style.ts";

import done from "@assets/images/done.json";

const SignupDonePage:FC = () => {
    const {lang} = useThemeStore();

    return (
        <Container>
            <Header centerText={headerCategories.doneSignUp[lang]}/>
            <LottieWrapper animationData={done}/>
            <p>{messageCategories.doneSignUp[lang]}</p>
            <Button type={"link"} to={"/"} content={buttonCategories.goHome[lang]} width={"full"} color={"primary"} scale={"big"}/>
        </Container>
    );
};

export default SignupDonePage;