import {FC} from "react";

import Header from "@components/common/Header";
import ArrowBack from "@components/common/ArrowBack";
import HeadTag from "@components/common/HeadTag";

import {headerCategories} from "@constants/headerCategories.ts";
import {useThemeStore} from "@store/useThemeStore.ts";

const ReservationsPage:FC = () => {
    const {lang} = useThemeStore();

    return (
        <>
            <HeadTag title={headerCategories.reservationManagementHeader[lang]}/>

            <Header leftChild={<ArrowBack/>} centerText={headerCategories.reservationManagementHeader[lang]}/>
        </>
    );
};

export default ReservationsPage;