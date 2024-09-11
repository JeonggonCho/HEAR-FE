import {FC} from "react";
import {Outlet} from "react-router-dom";

import Header from "@components/Header";
import Tab from "@components/Tab";

import {ITab} from "@/types/tab.ts";

import {HeaderWrapper} from "./style.ts";

import notice from "@assets/images/notice.png";

const tabs: ITab[] = [
    { name: "공지사항", path: "/communication/notice", },
    { name: "문의", path: "/communication/inquiry", },
    { name: "피드백", path: "/communication/feedback", },
];

const CommunicationLayout:FC = () => {
    return (
        <>
            <Header leftChild={
                <HeaderWrapper>
                    <img src={notice} alt="피드백"/>
                    <h2>소통</h2>
                </HeaderWrapper>
            }/>

            <Tab type={"line"} tabs={tabs}/>

            <Outlet/>
        </>
    );
};

export default CommunicationLayout;