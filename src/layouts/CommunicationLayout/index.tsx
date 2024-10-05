import {FC} from "react";
import {Outlet} from "react-router-dom";

import Header from "@components/common/Header";
import Tab from "@components/common/Tab";

import {ITab} from "@/types/tab.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {navCategories} from '@constants/navCategories.ts';

import {Container, HeaderWrapper} from "./style.ts";

import notice from "@assets/images/notice.png";

const CommunicationLayout:FC = () => {
    const {lang} = useThemeStore();

    const tabs: ITab[] = [
        { name: buttonCategories.notice[lang], path: "/communication/notice", },
        { name: buttonCategories.inquiry[lang], path: "/communication/inquiry", },
        { name: buttonCategories.feedback[lang], path: "/communication/feedback", },
    ];

    return (
        <Container>
            <Header leftChild={
                <HeaderWrapper>
                    <img src={notice} alt="피드백"/>
                    <h2>{navCategories.communication[lang]}</h2>
                </HeaderWrapper>
            }/>

            <Tab type={"line"} tabs={tabs}/>

            <Outlet/>
        </Container>
    );
};

export default CommunicationLayout;