import {FC, useCallback, useEffect, useState} from "react";

import Header from "@components/common/Header";
import Tab from "@components/common/Tab";
import InquiryFeedbackListItem from "@components/board/InquiryFeedbackListItem";
import FloatingButton from "@components/common/FloatingButton";
import Empty from "@components/common/Empty";
import CardLoading from "@components/skeleton/CardLoading";
import HeadTag from "@components/common/HeadTag";

import useRequest from "@hooks/useRequest.ts";
import {IFeedbackProps} from "@/types/componentProps.ts";
import {ITab} from "@/types/tab.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {useToastStore} from "@store/useToastStore.ts";
import {messageCategories} from "@constants/messageCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {navCategories} from "@constants/navCategories.ts";

import {Container} from "./style.ts";
import {HeaderWrapper} from "@pages/notice/NoticePage/style.ts";

import notice from "@assets/images/notice.png";


const FeedbackPage:FC = () => {
    const [feedback, setFeedback] = useState<IFeedbackProps[]>([]);

    const {lang} = useThemeStore();
    const {showToast} = useToastStore();
    const {isLoading, errorText, sendRequest, clearError} = useRequest();

    const tabs: ITab[] = [
        { name: buttonCategories.notice[lang], path: "/board/notice", },
        { name: buttonCategories.inquiry[lang], path: "/board/inquiry", },
        { name: buttonCategories.feedback[lang], path: "/board/feedback", },
    ];

    // 피드백 목록 요청
    const fetchFeedback = useCallback(async () => {
        try {
            const response = await sendRequest({
                url: "/feedback",
            });
            setFeedback(response.data);
        } catch (err) {
            console.error("피드백 목록 조회 중 에러 발생: ", err);
        }
    }, [sendRequest]);

    useEffect(() => {
        fetchFeedback();
    }, [fetchFeedback]);

    // 에러 메시지
    useEffect(() => {
        if (errorText) {
            showToast(errorText, "error");
            const errorTimer = setTimeout(clearError, 6000);
            return () => clearTimeout(errorTimer);
        }
    }, [errorText, clearError, showToast]);

    return (
        <Container>
            <HeadTag title={buttonCategories.feedback[lang]}/>

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
                        {feedback.length !== 0 ? feedback.map((value, idx) => (
                                <InquiryFeedbackListItem key={idx} type={"feedback"} {...value}/>
                            ))
                            :
                            <Empty
                                title={messageCategories.emptyFeedback[lang]}
                                message={messageCategories.makeFeedback[lang]}
                            />
                        }
                    </>
                }
            </div>

            <FloatingButton to={"/board/feedback/new"}/>
        </Container>
    );
};

export default FeedbackPage;