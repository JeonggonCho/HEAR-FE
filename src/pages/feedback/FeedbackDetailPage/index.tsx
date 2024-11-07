import React, {FC, FormEvent, MutableRefObject, useCallback, useEffect, useMemo, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {ReactSVG} from "react-svg";

import Header from "@components/common/Header";
import ArrowBack from "@components/common/ArrowBack";
import LoadingLoop from "@components/common/LoadingLoop";
import Dropdown from "@components/common/Dropdown";
import HeadTag from "@components/common/HeadTag";
import Modal from "@components/common/Modal";
import ConfirmContent from "@components/content/ConfirmContent";
import Button from "@components/common/Button";
import Comments from "@components/board/Comments";
import ProfileImage from "@components/common/ProfileImage";

import useRequest from "@hooks/useRequest.ts";
import useTextarea from "@hooks/useTextarea.ts";
import generateLinksAndLineBreaks from "@util/generateLinksAndLineBreaks.ts";
import getTimeStamp from "@util/getTimeStamp.ts";
import {IFeedbackProps, IInquiryProps, INotice} from "@/types/componentProps.ts";
import {IComment} from "@/types/comment.ts";
import {useUserInfoStore} from "@store/useUserStore.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {useToastStore} from "@store/useToastStore.ts";
import {feedbackCategories} from "@constants/feedbackCategories.ts";
import {headerCategories} from "@constants/headerCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {messageCategories} from "@constants/messageCategories.ts";

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

import views from "@assets/icons/visible.svg";
import likes from "@assets/icons/feedback.svg";
import chat from "@assets/icons/chat.svg";
import deleteIcon from "@assets/icons/delete.svg";
import editIcon from "@assets/icons/edit.svg";


const FeedbackDetailPage:FC = () => {
    const [feedback, setFeedback] = useState<IFeedbackProps>();
    const [comments, setComments] = useState<IComment[]>([]);
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [emptyCommentContent, setEmptyCommentContent] = useState<boolean>(false);
    const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);

    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const navigate = useNavigate();
    const {feedbackId} = useParams();

    const {userInfo} = useUserInfoStore();
    const {lang, isDarkMode} = useThemeStore();
    const {showToast} = useToastStore();
    const {isLoading, errorText, sendRequest, clearError} = useRequest();
    const {text, countOfText, handleTextChange, setText} = useTextarea();

    // 피드백 생성 일자
    const timeStamp = useMemo(() => {
        return feedback?.createdAt ? getTimeStamp(feedback.createdAt, lang) : '';
    }, [feedback?.createdAt]);

    // 피드백 내용 링크 처리
    const transformedText = useMemo(() => {
        return feedback?.content ? generateLinksAndLineBreaks(feedback.content) : '';
    }, [feedback?.content]);

    // 피드백 디테일 조회
    const fetchFeedback = useCallback(async () => {
        try {
            const response = await sendRequest({
                url: `/feedback/${feedbackId}`
            });
            setFeedback(response.data.feedback);
            setIsLiked(response.data.feedback.isLiked);
            setComments(response.data.comments);
        } catch (err) {
            console.error("피드백 조회 중 에러 발생: ", err);
        }
    }, [sendRequest, feedbackId]);

    useEffect(() => {
        fetchFeedback();
    }, [fetchFeedback]);

        // 피드백 삭제 확인 모달 띄우기
    const deleteFeedbackConfirm = () => {
        setShowConfirmModal(true);
    };

    // 피드백 삭제
    const deleteFeedback = async () => {
        try {
            await sendRequest({
                url: `/feedback/${feedbackId}`,
                method: "delete",
            });
            navigate(-1);
        } catch (err) {
            console.error("피드백 삭제 중 에러 발생: ", err);
        }
    };

    // 피드백 수정
    const updateFeedback = () => {
        navigate(`/board/feedback/${feedbackId}/update`);
    };

    // 피드백 좋아요
    const likeFeedback = async () => {
        try {
            const response = await sendRequest({
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

    // 피드백 드롭다운 메뉴목록
    const feedbackDropdownMenus = [
        {icon: editIcon, label: buttonCategories.edit[lang], action: updateFeedback},
        {icon: deleteIcon, label: buttonCategories.delete[lang], action: deleteFeedbackConfirm},
    ];

    // 댓글 생성 요청하기
    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (text.trim().length === 0) {
            setEmptyCommentContent(true);
            return;
        }

        const data = {
            content: text.trim(),
            refId: feedbackId,
            refType: "feedback",
        };

        try {
            const response = await sendRequest({
                url: "/comments",
                method: "post",
                data: data,
            });
            if (response.data) {
                setComments(prevState => [response.data, ...prevState]);
                setFeedback(prevState => {
                    if (!prevState) return prevState;
                    return ({
                        ...prevState,
                        comments: prevState.comments + 1
                    });
                });
            }
            setText("");
        } catch (err) {
            console.error("피드백 댓글 생성 요청 중 에러 발생: ", err);
        }
    };

    // 댓글 버튼 클릭 시
    const commentClickHandler = () => {
        textareaRef.current?.focus();
    };

    // 댓글 공란 에러 메시지
    useEffect(() => {
        if (emptyCommentContent) showToast(messageCategories.emptyCommentError[lang], "error");
        const errorTimer = setTimeout(() => setEmptyCommentContent(false), 6000);
        return () => clearTimeout(errorTimer);
    }, [emptyCommentContent]);

    // 에러 메시지
    useEffect(() => {
        if (errorText) showToast(errorText, "error");
        const errorTimer = setTimeout(clearError, 6000);
        return () => clearTimeout(errorTimer);
    }, [errorText]);


    return (
        <>
            <Container>
                <HeadTag title={feedback?.title || headerCategories.feedbackDetail[lang]}/>

                <Header leftChild={<ArrowBack/>} centerText={headerCategories.feedbackDetail[lang]}/>
                {!isLoading && feedback ?
                    <>
                        {/*피드백 부분*/}
                        <FeedbackWrapper>
                            <FeedbackInfoWrapper>
                                <div>
                                    <div>
                                        <TagWrapper tag={feedback.category} darkmode={isDarkMode.toString()}>{feedbackCategories[feedback.category][lang]}</TagWrapper>
                                        <div>
                                            {feedbackId && feedback.creatorId === userInfo?.userId &&
                                              <Dropdown dropdownMenus={feedbackDropdownMenus}/>
                                            }
                                        </div>
                                    </div>
                                    <h2>{feedback.title}</h2>
                                </div>

                                <div>
                                    <WriterWrapper>
                                        <ProfileImage size={24}/>
                                        <span>{feedback.creator}</span>
                                    </WriterWrapper>
                                    <DateWrapper>{timeStamp}</DateWrapper>

                                    <CountsWrapper>
                                        <div>
                                            <ReactSVG src={views}/>
                                            <span>{feedback.views || 0}</span>
                                        </div>
                                        <div>
                                            <ReactSVG src={likes}/>
                                            <span>{feedback.likes || 0}</span>
                                        </div>
                                        <div>
                                            <ReactSVG src={chat}/>
                                            <span>{feedback.comments || 0}</span>
                                        </div>
                                    </CountsWrapper>
                                </div>
                            </FeedbackInfoWrapper>

                            <ContentWrapper darkmode={isDarkMode.toString()}>
                                <p dangerouslySetInnerHTML={{__html: transformedText}}/>
                            </ContentWrapper>

                            <BtnsWrapper>
                                <LikeBtnWrapper onClick={likeFeedback} isLiked={isLiked}>
                                    <ReactSVG src={likes}/>
                                    <span>{buttonCategories.like[lang]}</span>
                                </LikeBtnWrapper>
                                <CommentBtnWrapper onClick={commentClickHandler}>
                                    <ReactSVG src={chat}/>
                                    <span>{buttonCategories.comment[lang]}</span>
                                </CommentBtnWrapper>
                            </BtnsWrapper>
                        </FeedbackWrapper>

                        {/*댓글 부분*/}
                        <Comments
                            text={text}
                            textareaRef={textareaRef as MutableRefObject<HTMLTextAreaElement>}
                            countOfText={countOfText}
                            handleTextChange={handleTextChange}
                            comments={comments}
                            setComments={setComments}
                            setRefDoc={setFeedback as React.Dispatch<React.SetStateAction<IInquiryProps | IFeedbackProps | INotice>>}
                            submitHandler={submitHandler}
                        />
                    </>
                    :
                    <LoadingLoop/>
                }
            </Container>

            {showConfirmModal &&
              <Modal
                content={
                    <ConfirmContent
                        text={messageCategories.delete[lang]}
                        leftBtn={<Button type={"button"} content={buttonCategories.close[lang]} color={"third"} scale={"normal"} width={"full"} onClick={() => setShowConfirmModal(false)}/> }
                        rightBtn={<Button type={"submit"} content={buttonCategories.delete[lang]} color={"danger"} scale={"normal"} width={"full"} onClick={deleteFeedback}/>}
                    />
                }
                setModal={() => setShowConfirmModal(false)}
                type={"popup"}
              />
            }
        </>
    );
};

export default FeedbackDetailPage;