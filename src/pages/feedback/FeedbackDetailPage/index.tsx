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

import {
    BtnsWrapper, CommentBtnWrapper,
    Container,
    ContentWrapper,
    CountsWrapper,
    DateWrapper,
    FeedbackInfoWrapper,
    FeedbackWrapper, LikeBtnWrapper
} from "./style.ts";
import {TagWrapper, WriterWrapper} from "@components/board/InquiryFeedbackListItem/style.ts";

import noProfile from "@assets/icons/no_profile.svg";
import views from "@assets/icons/visible.svg";
import likes from "@assets/icons/feedback.svg";
import comments from "@assets/icons/chat.svg";

const FeedbackDetailPage:FC = () => {
    const [feedback, setFeedback] = useState<IFeedbackProps>();
    const [isLiked, setIsLiked] = useState<boolean>(false);

    const {feedbackId} = useParams();

    const {userInfo} = useUserInfoStore();
    const {lang} = useThemeStore();

    const timeStamp = useMemo(() => {
        return feedback?.createdAt ? getTimeStamp(feedback.createdAt, lang) : '';
    }, [feedback?.createdAt]);

    const {isLoading, errorText, sendRequest, clearError} = useRequest();
    const {errorText: likeErrorText, sendRequest: likeSendRequest, clearError: likeClearError} = useRequest();

    // 피드백 디테일 조회
    const fetchFeedback = useCallback(async () => {
        try {
            const response = await sendRequest({
                url: `/feedback/${feedbackId}`
            });
            setFeedback(response.data);
            setIsLiked(response.data.isLiked);
        } catch (err) {
            console.error("피드백 조회 중 에러 발생: ", err);
        }
    }, [sendRequest, feedbackId]);

    useEffect(() => {
        fetchFeedback();
    }, [fetchFeedback]);

    // 피드백 좋아요
    const likeFeedback = async () => {
        try {
            const response = await likeSendRequest({
                url: `/feedback/like/${feedbackId}`,
                method: "post",
                data: {},
            });
            if (response.data) {
                setIsLiked(response.data.isLiked);
                setFeedback((prevState) => {
                    if (!prevState) return prevState;
                    return {
                        ...prevState,
                        likes: response.data.likes,
                    };
                });
            }
        } catch (err) {
            console.error("피드백 좋아요 처리 중 에러 발생: ", err);
        }
    };

    return (
        <Container>
            <HeadTag title={feedback?.title || headerCategories.feedbackDetail[lang]}/>

            <Header leftChild={<ArrowBack/>} centerText={headerCategories.feedbackDetail[lang]}/>
            {!isLoading && feedback ?
                <>
                    <FeedbackWrapper>
                        <FeedbackInfoWrapper>
                            <div>
                                <div>
                                    <TagWrapper tag={feedback.category}>{feedbackCategories[feedback.category][lang]}</TagWrapper>
                                    <div>
                                        {feedbackId && feedback.creatorId === userInfo?.userId &&
                                          <Dropdown type={"feedback"} id={feedbackId}/>
                                        }
                                    </div>
                                </div>
                                <h2>{feedback.title}</h2>
                            </div>

                            <div>
                                <WriterWrapper>
                                    <div>
                                        <ReactSVG src={noProfile}/>
                                    </div>
                                    <span>{feedback.creator}</span>
                                </WriterWrapper>
                                <DateWrapper>{timeStamp}</DateWrapper>

                                <CountsWrapper>
                                    <div>
                                        <ReactSVG src={views}/>
                                        <span>{feedback.views}</span>
                                    </div>
                                    <div>
                                        <ReactSVG src={likes}/>
                                        <span>{feedback.likes}</span>
                                    </div>
                                    <div>
                                        <ReactSVG src={comments}/>
                                        <span>{feedback.views}</span>
                                    </div>
                                </CountsWrapper>
                            </div>
                        </FeedbackInfoWrapper>

                        <ContentWrapper>
                            <p>{feedback.content}</p>
                        </ContentWrapper>

                        <BtnsWrapper>
                            <LikeBtnWrapper onClick={likeFeedback} isLiked={isLiked}>
                                <ReactSVG src={likes}/>
                                <span>좋아요</span>
                            </LikeBtnWrapper>
                            <CommentBtnWrapper>
                                <ReactSVG src={comments}/>
                                <span>댓글</span>
                            </CommentBtnWrapper>
                        </BtnsWrapper>
                    </FeedbackWrapper>

                    {/*<div>*/}
                    {/*    작성된 답변이 없습니다*/}
                    {/*</div>*/}
                </>
                :
                <LoadingLoop/>
            }

            {errorText &&
                <Toast text={errorText} setToast={clearError} type={"error"}/>
            }

            {likeErrorText &&
              <Toast text={likeErrorText} setToast={likeClearError} type={"error"}/>
            }
        </Container>
    );
};

export default FeedbackDetailPage;