import React, {FormEvent, MutableRefObject, useCallback, useEffect, useMemo, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {ReactSVG} from "react-svg";
import {Header} from "@components/common/Header";
import ArrowBack from "@components/common/ArrowBack";
import LoadingLoop from "@components/common/LoadingLoop";
import Dropdown from "@components/common/Dropdown";
import HeadTag from "@components/common/HeadTag";
import Button from "@components/common/Button";
import {Modal} from "@components/common/Modal";
import ModalConfirmContent from "@components/common/Modal/ConfirmModal.tsx";
import Comments from "@components/comment/Comments";
import ProfileImage from "@components/common/ProfileImage";
import Grid from "@components/common/Grid";
import useRequest from "@hooks/useRequest.ts";
import useTextarea from "@hooks/useTextarea.ts";
import getTimeStamp from "@util/getTimeStamp.ts";
import generateLinksAndLineBreaks from "@util/generateLinksAndLineBreaks.ts";
import {IFeedbackProps, IInquiryProps, INotice} from "@/types/componentProps.ts";
import {IComment} from "@/types/comment.ts";
import {useUserInfoStore} from "@store/useUserStore.ts";
import {useToastStore} from "@store/useToastStore.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {
    BtnsWrapper, CommentBtnWrapper,
    Container,
    ContentWrapper,
    CountsWrapper,
    DateWrapper,
    InquiryInfoWrapper,
    InquiryWrapper, LikeBtnWrapper
} from "./style.ts";
import {TagWrapper, WriterWrapper} from "@components/feedback/InquiryFeedbackListItem/style.ts";
import {headerCenter} from "@components/common/Header/style.ts";
import {inquiryCategories} from "@constants/inquiryCategories.ts";
import {headerCategories} from "@constants/headerCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {messageCategories} from "@constants/messageCategories.ts";
import views from "@assets/icons/visible.svg";
import likes from "@assets/icons/feedback.svg";
import chat from "@assets/icons/chat.svg";
import deleteIcon from "@assets/icons/delete.svg";
import editIcon from "@assets/icons/edit.svg";


const InquiryDetailPage = () => {
    const [inquiry, setInquiry] = useState<IInquiryProps>();
    const [comments, setComments] = useState<IComment[]>([]);
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [emptyCommentContent, setEmptyCommentContent] = useState<boolean>(false);
    const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);

    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const navigate = useNavigate();
    const {inquiryId} = useParams();

    const {userInfo} = useUserInfoStore();
    const {lang, isDarkMode} = useThemeStore();
    const {showToast} = useToastStore();
    const {isLoading, errorText, sendRequest, clearError} = useRequest();
    const {sendRequest:likeSendRequest, errorText:likeErrorText, clearError:likeClearError} = useRequest();
    const {sendRequest:commentSendRequest, errorText:commentErrorText, clearError:commentClearError} = useRequest();
    const {text, countOfText, handleTextChange, setText} = useTextarea(); // 댓글 textarea

    // 문의 생성 날짜 스탬프
    const timeStamp = useMemo(() => {
        return inquiry?.createdAt ? getTimeStamp(inquiry.createdAt, lang) : '';
    }, [inquiry?.createdAt]);

    // 문의 내용 링크 처리
    const transformedText = useMemo(() => {
        return inquiry?.content ?generateLinksAndLineBreaks(inquiry.content): '';
    }, [inquiry?.content]);

    // 문의 디테일 조회
    const fetchInquiry = useCallback(async () => {
        try {
            const response = await sendRequest({
                url: `/inquiries/${inquiryId}`
            });
            setInquiry(response.data.inquiry);
            setIsLiked(response.data.inquiry.isLiked);
            setComments(response.data.comments);
        } catch (err) {
            console.error("문의 조회 중 에러 발생: ", err);
        }
    }, [sendRequest, inquiryId]);

    useEffect(() => {
        fetchInquiry();
    }, [fetchInquiry]);

    // 문의 좋아요
    const likeInquiry = async () => {
        try {
            const response = await likeSendRequest({
                url: `/inquiries/like/${inquiryId}`,
                method: "post",
                data: {},
            });
            if (response.data) {
                setIsLiked(response.data.isLiked);
                setInquiry((prevState) => {
                    if (!prevState) return prevState;
                    return {
                        ...prevState,
                        likes: response.data.likes,
                    };
                });
            }
        } catch (err) {
            console.error("문의 좋아요 처리 중 에러 발생: ", err);
        }
    };

    // 문의 삭제 확인 모달 띄우기
    const deleteInquiryConfirm = () => {
        setShowConfirmModal(true);
    };

    // 문의 삭제
    const deleteInquiry = async () => {
        try {
            await sendRequest({
                url: `/inquiries/${inquiryId}`,
                method: "delete",
            });
            navigate(-1);
        } catch (err) {
            console.error("문의 삭제 중 에러 발생: ", err);
        }
    };

    // 문의 수정
    const updateInquiry = () => {
        navigate(`/board/inquiry/${inquiryId}/update`);
    };

    // 문의 드롭다운 메뉴목록
    const inquiryDropdownMenus = [
        {icon: editIcon, label: buttonCategories.edit[lang], action: updateInquiry},
        {icon: deleteIcon, label: buttonCategories.delete[lang], action: deleteInquiryConfirm},
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
            refId: inquiryId,
            refType: "inquiry",
        };

        try {
            const response = await commentSendRequest({
                url: "/comments",
                method: "post",
                data: data,
            });
            if (response.data) {
                setComments(prevState => [response.data, ...prevState]);
                setInquiry(prevState => {
                    if (!prevState) return prevState;
                    return ({
                        ...prevState,
                        comments: prevState.comments + 1
                    });
                });
            }
            setText("");
        } catch (err) {
            console.error("문의 댓글 생성 요청 중 에러 발생: ", err);
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

    // 좋아요 에러 메시지
    useEffect(() => {
        if (likeErrorText) showToast(likeErrorText, "error");
        const errorTimer = setTimeout(likeClearError, 6000);
        return () => clearTimeout(errorTimer);
    }, [likeErrorText]);

    // 댓글 에러 메시지
    useEffect(() => {
        if (commentErrorText) showToast(commentErrorText, "error");
        const errorTimer = setTimeout(commentClearError, 6000);
        return () => clearTimeout(errorTimer);
    }, [commentErrorText]);


    return (
        <>
            <Container>
                <HeadTag title={inquiry?.title || headerCategories.inquiryDetail[lang]}/>

                <Header>
                    <Grid align={"center"} columns={3} style={{width: "100%"}}>
                        <Header.Left>
                            <ArrowBack/>
                        </Header.Left>
                        <Header.Center>
                            <h2 css={headerCenter}>{headerCategories.inquiryDetail[lang]}</h2>
                        </Header.Center>
                    </Grid>
                </Header>

                {!isLoading && inquiry ?
                    <>
                        {/*문의 부분*/}
                        <InquiryWrapper>
                            <InquiryInfoWrapper>
                                <div>
                                    <div>
                                        <TagWrapper tag={inquiry.category} darkmode={isDarkMode.toString()}>{inquiryCategories[inquiry.category][lang]}</TagWrapper>
                                        <div>
                                            {inquiryId && inquiry && inquiry.creatorId === userInfo?.userId &&
                                              <Dropdown dropdownMenus={inquiryDropdownMenus}/>
                                            }
                                        </div>
                                    </div>
                                    <h2>{inquiry.title}</h2>
                                </div>

                                <div>
                                    <WriterWrapper>
                                        <ProfileImage size={24}/>
                                        <span>{inquiry.creator}</span>
                                    </WriterWrapper>
                                    <DateWrapper>{timeStamp}</DateWrapper>

                                    <CountsWrapper>
                                        <div>
                                            <ReactSVG src={views}/>
                                            <span>{inquiry.views || 0}</span>
                                        </div>
                                        <div>
                                            <ReactSVG src={likes}/>
                                            <span>{inquiry.likes || 0}</span>
                                        </div>
                                        <div>
                                            <ReactSVG src={chat}/>
                                            <span>{inquiry.comments || 0}</span>
                                        </div>
                                    </CountsWrapper>
                                </div>
                            </InquiryInfoWrapper>

                            <ContentWrapper darkmode={isDarkMode.toString()}>
                                <p dangerouslySetInnerHTML={{__html: transformedText}}/>
                            </ContentWrapper>

                            <BtnsWrapper>
                                <LikeBtnWrapper onClick={likeInquiry} isLiked={isLiked}>
                                    <ReactSVG src={likes}/>
                                    <span>{buttonCategories.like[lang]}</span>
                                </LikeBtnWrapper>
                                <CommentBtnWrapper onClick={commentClickHandler}>
                                    <ReactSVG src={chat}/>
                                    <span>{buttonCategories.comment[lang]}</span>
                                </CommentBtnWrapper>
                            </BtnsWrapper>
                        </InquiryWrapper>

                        {/*댓글 부분*/}
                        <Comments
                            text={text}
                            textareaRef={textareaRef as MutableRefObject<HTMLTextAreaElement>}
                            countOfText={countOfText}
                            handleTextChange={handleTextChange}
                            comments={comments}
                            setComments={setComments}
                            setRefDoc={setInquiry as React.Dispatch<React.SetStateAction<IInquiryProps | IFeedbackProps | INotice>>}
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
                    <ModalConfirmContent
                        text={messageCategories.delete[lang]}
                        leftBtn={<Button type={"button"} content={buttonCategories.close[lang]} color={"third"} scale={"normal"} width={"full"} onClick={() => setShowConfirmModal(false)}/> }
                        rightBtn={<Button type={"submit"} content={buttonCategories.delete[lang]} color={"danger"} scale={"normal"} width={"full"} onClick={deleteInquiry}/>}
                    />
                }
                setModal={() => setShowConfirmModal(false)}
                type={"popup"}
              />
            }
        </>
    );
};

export default InquiryDetailPage;