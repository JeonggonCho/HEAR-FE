import {FC} from "react";

import Header from "@components/common/Header";
import ArrowBack from "@components/common/ArrowBack";
import HeadTag from "@components/common/HeadTag";

import {useThemeStore} from "@store/useThemeStore.ts";
import {headerCategories} from "@constants/headerCategories.ts";

const MyWarningPage:FC = () => {
    const {lang} = useThemeStore();

    return (
        <>
            <HeadTag title={headerCategories.myWarning[lang]}/>

            <Header leftChild={<ArrowBack/>} centerText={headerCategories.myWarning[lang]}/>
        </>
    );
};

export default MyWarningPage;