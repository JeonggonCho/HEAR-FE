import {FC} from "react";

import Header from "@components/common/Header";
import ArrowBack from "@components/common/ArrowBack";

import {headerCategories} from "@constants/headerCategories.ts";
import {useThemeStore} from "@store/useThemeStore.ts";

const NotificationPage:FC = () => {
    const {lang} = useThemeStore();

    return (
        <div>
            <Header leftChild={<ArrowBack/>} centerText={headerCategories.notification[lang]}/>
            알림 페이지
        </div>
    );
};

export default NotificationPage;