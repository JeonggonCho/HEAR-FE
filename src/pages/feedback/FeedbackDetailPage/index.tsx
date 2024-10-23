import {FC, useCallback, useEffect, useMemo, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {ReactSVG} from "react-svg";

import Header from "@components/common/Header";
import ArrowBack from "@components/common/ArrowBack";
import LoadingLoop from "@components/common/LoadingLoop";
import Toast from "@components/common/Toast";
import Dropdown from "@components/common/Dropdown";
import HeadTag from "@components/common/HeadTag";
import Modal from "@components/common/Modal";
import ConfirmContent from "@components/content/ConfirmContent";
import Button from "@components/common/Button";

import useRequest from "@hooks/useRequest.ts";
import generateLinksAndLineBreaks from "@util/generateLinksAndLineBreaks.ts";
import getTimeStamp from "@util/getTimeStamp.ts";
import {IFeedbackProps} from "@/types/componentProps.ts";
import {feedbackCategories} from "@constants/feedbackCategories.ts";
import {useUserInfoStore} from "@store/useUserStore.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
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

import noProfile from "@assets/icons/no_profile.svg";
import views from "@assets/icons/visible.svg";
import likes from "@assets/icons/feedback.svg";
import comments from "@assets/icons/chat.svg";
import deleteIcon from "@assets/icons/delete.svg";
import editIcon from "@assets/icons/edit.svg";


const FeedbackDetailPage:FC = () => {
    const [feedback, setFeedback] = useState<IFeedbackProps>();
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);

    const navigate = useNavigate();
    const {feedbackId} = useParams();

    const {userInfo} = useUserInfoStore();
    const {lang, isDarkMode} = useThemeStore();
    const {isLoading, errorText, sendRequest, clearError} = useRequest();
    const {errorText: deleteFeedbackErrorText, sendRequest: deleteFeedbackSendRequest, clearError: deleteFeedbackClearError} = useRequest();
    const {errorText: likeErrorText, sendRequest: likeSendRequest, clearError: likeClearError} = useRequest();

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
            setFeedback(response.data);
            setIsLiked(response.data.isLiked);
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
            await deleteFeedbackSendRequest({
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

    // 피드백 드롭다운 메뉴목록
    const feedbackDropdownMenus = [
        {icon: editIcon, label: buttonCategories.edit[lang], action: updateFeedback},
        {icon: deleteIcon, label: buttonCategories.delete[lang], action: deleteFeedbackConfirm},
    ];


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
                                    <TagWrapper tag={feedback.category} isDarkMode={isDarkMode}>{feedbackCategories[feedback.category][lang]}</TagWrapper>
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
                                    <div>
                                        <ReactSVG src={noProfile}/>
                                    </div>
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
                                        <ReactSVG src={comments}/>
                                        <span>{feedback.comments || 0}</span>
                                    </div>
                                </CountsWrapper>
                            </div>
                        </FeedbackInfoWrapper>

                        <ContentWrapper isDarkMode={isDarkMode}>
                            <p dangerouslySetInnerHTML={{__html: transformedText}}/>
                        </ContentWrapper>

                        <BtnsWrapper>
                            <LikeBtnWrapper onClick={likeFeedback} isLiked={isLiked}>
                                <ReactSVG src={likes}/>
                                <span>{buttonCategories.like[lang]}</span>
                            </LikeBtnWrapper>
                            <CommentBtnWrapper>
                                <ReactSVG src={comments}/>
                                <span>{buttonCategories.comment[lang]}</span>
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

            {deleteFeedbackErrorText &&
              <Toast text={deleteFeedbackErrorText} setToast={deleteFeedbackClearError} type={"error"}/>
            }

            {likeErrorText &&
              <Toast text={likeErrorText} setToast={likeClearError} type={"error"}/>
            }

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
        </Container>
    );
};

export default FeedbackDetailPage;