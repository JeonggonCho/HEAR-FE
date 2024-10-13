import {FC, useCallback, useEffect, useState} from "react";

import InquiryFeedbackListItem from "@components/board/InquiryFeedbackListItem";
import FloatingButton from "@components/common/FloatingButton";
import Empty from "@components/common/Empty";
import Modal from "@components/common/Modal";
import ErrorContent from "@components/content/ErrorContent";
import CardLoading from "@components/skeleton/CardLoading";
import Tab from "@components/common/Tab";
import Header from "@components/common/Header";
import HeadTag from "@components/common/HeadTag";

import useRequest from "@hooks/useRequest.ts";
import {IFeedbackProps} from "@/types/componentProps.ts";
import {messageCategories} from "@constants/messageCategories.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {ITab} from "@/types/tab.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {navCategories} from "@constants/navCategories.ts";

import {Container} from "./style.ts";
import {HeaderWrapper} from "@pages/notice/NoticePage/style.ts";

import notice from "@assets/images/notice.png";

const FeedbackPage:FC = () => {
    const [feedback, setFeedback] = useState<IFeedbackProps[]>([]);

    const {lang} = useThemeStore();

    const {isLoading, errorText, sendRequest, clearError} = useRequest();

    const tabs: ITab[] = [
        { name: buttonCategories.notice[lang], path: "/board/notice", },
        { name: buttonCategories.inquiry[lang], path: "/board/inquiry", },
        { name: buttonCategories.feedback[lang], path: "/board/feedback", },
    ];

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
                        <CardLoading heightValue={"90px"}/>
                        <CardLoading heightValue={"90px"}/>
                        <CardLoading heightValue={"90px"}/>
                        <CardLoading heightValue={"90px"}/>
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

            {errorText &&
              <Modal
                content={<ErrorContent text={errorText} closeModal={clearError}/>}
                setModal={clearError}
                type={"popup"}
              />
            }
        </Container>
    );
};

export default FeedbackPage;