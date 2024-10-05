import {FC} from "react";

import Header from "@components/common/Header";
import Button from "@components/common/Button";

import {buttonLabels, headerTitle, message} from "@constants/langCategories.ts";
import {useThemeStore} from "@store/useThemeStore.ts";

import {Container, LottieWrapper} from "./style.ts";

import done from "@assets/images/done.json";


const SignupDonePage:FC = () => {
    const {lang} = useThemeStore();

    return (
        <Container>
            <Header centerText={headerTitle.doneSignUp[lang]}/>
            <LottieWrapper animationData={done}/>
            <p>{message.doneSignUp[lang]}</p>
            <Button type={"link"} to={"/"} content={buttonLabels.goHome[lang]} width={"full"} color={"primary"} scale={"big"}/>
        </Container>
    );
};

export default SignupDonePage;