import {FC} from "react";

import Header from "@components/common/Header";
import ArrowBack from "@components/common/ArrowBack";
import HeadTag from "@components/common/HeadTag";

import {useThemeStore} from "@store/useThemeStore.ts";
import {headerCategories} from "@constants/headerCategories.ts";

const MyUsagePage:FC = () => {
    const {lang} = useThemeStore();
    return (
        <>
            <HeadTag title={headerCategories.myUsage[lang]}/>

            <Header leftChild={<ArrowBack/>} centerText={headerCategories.myUsage[lang]}/>
        </>
    );
};

export default MyUsagePage;