import {FC, useCallback, useEffect, useMemo, useState} from "react";
import {useParams} from "react-router-dom";
import {ReactSVG} from "react-svg";

import Header from "@components/common/Header";
import ArrowBack from "@components/common/ArrowBack";
import LoadingLoop from "@components/common/LoadingLoop";
import Toast from "@components/common/Toast";
import Dropdown from "@components/common/Dropdown";
import HeadTag from "@components/common/HeadTag";

import useRequest from "@hooks/useRequest.ts";
import {IFeedbackProps} from "@/types/componentProps.ts";
import getTimeStamp from "@util/getTimeStamp.ts";
import {feedbackCategories} from "@constants/feedbackCategories.ts";
import {useUserInfoStore} from "@store/useUserStore.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {headerCategories} from "@constants/headerCategories.ts";

import {Container, ContentWrapper, FeedbackInfoWrapper} from "./style.ts";
import {TagWrapper, WriterWrapper} from "@components/board/InquiryFeedbackListItem/style.ts";

import noProfile from "@assets/icons/no_profile.svg";

const FeedbackDetailPage:FC = () => {
    const [feedback, setFeedback] = useState<IFeedbackProps>();

    const {feedbackId} = useParams();

    const {userInfo} = useUserInfoStore();
    const {lang} = useThemeStore();

    const timeStamp = useMemo(() => {
        return feedback?.createdAt ? getTimeStamp(feedback.createdAt, lang) : '';
    }, [feedback?.createdAt]);

    const {isLoading, errorText, sendRequest, clearError} = useRequest();

    const fetchFeedback = useCallback(async () => {
        try {
            const response = await sendRequest({
                url: `/feedback/${feedbackId}`
            });
            setFeedback(response.data);
        } catch (err) {
            console.error("피드백 조회 중 에러 발생: ", err);
        }
    }, [sendRequest, feedbackId]);

    useEffect(() => {
        fetchFeedback();
    }, [fetchFeedback]);

    return (
        <Container>
            <HeadTag title={feedback?.title || headerCategories.feedbackDetail[lang]}/>

            <Header leftChild={<ArrowBack/>} centerText={headerCategories.feedbackDetail[lang]}/>
            {!isLoading && feedback ?
                <>
                    <FeedbackInfoWrapper>
                        <div>
                            <TagWrapper tag={feedback.category}>{feedbackCategories[feedback.category][lang]}</TagWrapper>
                            <h2>{feedback.title}</h2>
                        </div>

                        <div>
                            <WriterWrapper>
                                <div>
                                    <ReactSVG src={noProfile}/>
                                </div>
                                <span>{feedback.creator}</span>
                            </WriterWrapper>
                            <div>
                                <span>{timeStamp}</span>
                                {feedbackId && feedback.creatorId === userInfo?.userId &&
                                  <Dropdown type={"feedback"} id={feedbackId}/>
                                }
                            </div>
                        </div>
                    </FeedbackInfoWrapper>

                    <ContentWrapper>
                        <p>{feedback.content}</p>
                    </ContentWrapper>

                    <div>
                        작성된 답변이 없습니다
                    </div>
                </>
                :
                <LoadingLoop/>
            }

            {errorText &&
                <Toast text={errorText} setToast={clearError} type={"error"}/>
            }
        </Container>
    );
};

export default FeedbackDetailPage;