import React, {FC, useCallback, useEffect, useState} from "react";

import InquiryFeedbackListItem from "@components/board/InquiryFeedbackListItem";
import FloatingButton from "@components/common/FloatingButton";
import Empty from "@components/common/Empty";
import Toast from "@components/common/Toast";
import CardLoading from "@components/skeleton/CardLoading";
import Header from "@components/common/Header";
import Tab from "@components/common/Tab";
import HeadTag from "@components/common/HeadTag";

import useRequest from "@hooks/useRequest.ts";
import {IInquiryProps} from "@/types/componentProps.ts";
import {useUserDataStore} from "@store/useUserStore.ts";
import {messageCategories} from "@constants/messageCategories.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {ITab} from "@/types/tab.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {navCategories} from "@constants/navCategories.ts";

import {Container} from "./style.ts";
import {HeaderWrapper} from "@pages/notice/NoticePage/style.ts";

import notice from "@assets/images/notice.png";

const InquiryPage:FC = () => {
    const [inquiries, setInquiries] = useState<IInquiryProps[]>([]);

    const {userData} = useUserDataStore();
    const {lang} = useThemeStore();

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
                        <CardLoading heightValue={"90px"}/>
                        <CardLoading heightValue={"90px"}/>
                        <CardLoading heightValue={"90px"}/>
                        <CardLoading heightValue={"90px"}/>
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

            {errorText &&
                <Toast text={errorText} setToast={clearError}/>
            }
        </Container>
    );
};

export default React.memo(InquiryPage);