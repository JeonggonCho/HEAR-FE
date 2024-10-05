import {FC} from "react";

import Header from "@components/common/Header";
import Button from "@components/common/Button";

import {useThemeStore} from "@store/useThemeStore.ts";
import {messageCategories} from "@constants/messageCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {headerCategories} from "@constants/headerCategories.ts";

import {Container, LottieWrapper} from "./style.ts";

import done from "@assets/images/done.json";

const ReservationDonePage:FC = () => {
    const {lang} = useThemeStore();

    return (
        <Container>
            <Header centerText={headerCategories.doneReservation[lang]}/>
            <LottieWrapper animationData={done}/>
            <p>{messageCategories.doneReservation[lang]}</p>
            <Button type={"link"} to={"/"} content={buttonCategories.goHome[lang]} width={"full"} color={"primary"} scale={"big"}/>
        </Container>
    );
};

export default ReservationDonePage;