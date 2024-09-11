import {FC, useCallback, useEffect, useMemo, useState} from "react";
import {useParams} from "react-router-dom";

import Header from "@components/Header";
import ArrowBack from "@components/ArrowBack";
import LoadingLoop from "@components/LoadingLoop";
import Modal from "@components/Modal";
import ErrorContent from "@components/ErrorContent";
import Dropdown from "@components/Dropdown";
import ChatBubble from "@components/ChatBubble";

import useRequest from "@hooks/useRequest.ts";
import {IFeedbackProps} from "@/types/componentProps.ts";
import getTimeStamp from "@util/getTimeStamp.ts";
import {feedbackCategoriesValues} from "@constants/feedbackCategories.ts";

import {Container} from "./style.ts";

import F from "@assets/images/F.png";
import {useUserInfoStore} from "@store/useUserStore.ts";


const FeedbackDetailPage:FC = () => {
    const [feedback, setFeedback] = useState<IFeedbackProps>();

    const {feedbackId} = useParams();

    const {userInfo} = useUserInfoStore();

    const timeStamp = useMemo(() => {
        return feedback?.createdAt ? getTimeStamp(feedback.createdAt) : '';
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
            <Header leftChild={<ArrowBack/>} centerText={"피드백"}/>
            {!isLoading && feedback ?
                <>
                    <span>{feedbackCategoriesValues[feedback.category]}</span>
                    <h2>{feedback.title}</h2>

                    <div>
                        <span>{feedback.creator}</span>
                        <div>
                            <span>{timeStamp}</span>
                            {feedbackId && feedback.creatorId === userInfo?.userId &&
                              <Dropdown type={"feedback"} id={feedbackId}/>
                            }
                        </div>
                    </div>
                    <hr/>
                    <div>
                        {feedback.content &&
                            <ChatBubble
                                text={feedback.content}
                                isMine={true}
                                showProfile={true}
                                profile={F}
                            />
                        }
                    </div>
                    <div>
                        작성된 답변이 없습니다
                    </div>
                </>
                :
                <LoadingLoop/>
            }

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

export default FeedbackDetailPage;