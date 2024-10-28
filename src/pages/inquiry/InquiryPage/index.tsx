import React, {FC, useCallback, useEffect, useState} from "react";

import Header from "@components/common/Header";
import Tab from "@components/common/Tab";
import InquiryFeedbackListItem from "@components/board/InquiryFeedbackListItem";
import FloatingButton from "@components/common/FloatingButton";
import Empty from "@components/common/Empty";
import CardLoading from "@components/skeleton/CardLoading";
import HeadTag from "@components/common/HeadTag";

import useRequest from "@hooks/useRequest.ts";
import {IInquiryProps} from "@/types/componentProps.ts";
import {ITab} from "@/types/tab.ts";
import {useUserDataStore} from "@store/useUserStore.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {useToastStore} from "@store/useToastStore.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {navCategories} from "@constants/navCategories.ts";
import {messageCategories} from "@constants/messageCategories.ts";

import {Container} from "./style.ts";
import {HeaderWrapper} from "@pages/notice/NoticePage/style.ts";

import notice from "@assets/images/notice.png";


const InquiryPage:FC = () => {
    const [inquiries, setInquiries] = useState<IInquiryProps[]>([]);

    const {userData} = useUserDataStore();
    const {lang} = useThemeStore();
    const {showToast} = useToastStore();

    const {isLoading, errorText, sendRequest, clearError} = useRequest();

    const tabs: ITab[] = [
        { name: buttonCategories.notice[lang], path: "/board/notice", },
        { name: buttonCategories.inquiry[lang], path: "/board/inquiry", },
        { name: buttonCategories.feedback[lang], path: "/board/feedback", },
    ];

    const fetchInquiries = useCallback(async () => {
        try {
            const response = await sendRequest({ url: "/inquiries" });
            setInquiries(response.data);
        } catch (err) {
            console.error("문의 목록 조회 중 에러 발생: ", err);
        }
    }, [sendRequest]);

    useEffect(() => {
        fetchInquiries();
    }, [fetchInquiries]);

    // 에러 메시지
    useEffect(() => {
        if (errorText) showToast(errorText, "error");
        const errorTimer = setTimeout(() => clearError(), 6000);
        return () => clearTimeout(errorTimer);
    }, [errorText]);

    return (
        <Container>
            <HeadTag title={buttonCategories.inquiry[lang]}/>

            <Header leftChild={
                <HeaderWrapper>
                    <img src={notice} alt="피드백"/>
                    <h2>{navCategories.board[lang]}</h2>
                </HeaderWrapper>
            }
                    type={"flex"}
                    bgColor={true}
            />

            <Tab type={"line"} tabs={tabs}/>

            <div>
                {isLoading ?
                    <div style={{display: "flex", flexDirection: "column", gap: 16}}>
                        <CardLoading heightValue={"160px"}/>
                        <CardLoading heightValue={"160px"}/>
                        <CardLoading heightValue={"160px"}/>
                        <CardLoading heightValue={"160px"}/>
                    </div>
                    :
                    <>
                        {inquiries.length !== 0 ? inquiries.map((value, idx) => (
                                <InquiryFeedbackListItem key={idx} type={"inquiry"} {...value}/>
                            ))
                            :
                            <Empty
                                title={messageCategories.emptyInquiry[lang]}
                                message={messageCategories.makeInquiry[lang]}
                            />
                        }
                    </>
                }
            </div>

            {userData?.role !== "manager" &&
              <FloatingButton to={"/board/inquiry/new"}/>
            }
        </Container>
    );
};

export default React.memo(InquiryPage);