import {FC} from "react";

import Header from "@components/common/Header";
import ArrowBack from "@components/common/ArrowBack";

import {headerTitle} from "@constants/langCategories.ts";
import {useThemeStore} from "@store/useThemeStore.ts";

const ReservationsPage:FC = () => {
    const {lang} = useThemeStore();

    return (
        <>
            <Header leftChild={<ArrowBack/>} centerText={headerTitle.reservationManagementHeader[lang]}/>
        </>
    );
};

export default ReservationsPage;