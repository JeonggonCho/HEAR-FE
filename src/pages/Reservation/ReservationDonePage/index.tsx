import {FC} from "react";

import Header from "@components/common/Header";
import Button from "@components/common/Button";

import {useThemeStore} from "@store/useThemeStore.ts";
import {buttonLabels, headerTitle, message} from "@constants/langCategories.ts";

import {Container, LottieWrapper} from "./style.ts";

import done from "@assets/images/done.json";

const ReservationDonePage:FC = () => {
    const {lang} = useThemeStore();

    return (
        <Container>
            <Header centerText={headerTitle.doneReservation[lang]}/>
            <LottieWrapper animationData={done}/>
            <p>{message.doneReservation[lang]}</p>
            <Button type={"link"} to={"/"} content={buttonLabels.goHome[lang]} width={"full"} color={"primary"} scale={"big"}/>
        </Container>
    );
};

export default ReservationDonePage;