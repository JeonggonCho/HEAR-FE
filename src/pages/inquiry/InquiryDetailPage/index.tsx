import {FC, FormEvent, ReactElement, useCallback, useEffect, useMemo, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {ReactSVG} from "react-svg";

import Header from "@components/common/Header";
import ArrowBack from "@components/common/ArrowBack";
import LoadingLoop from "@components/common/LoadingLoop";
import Toast from "@components/common/Toast";
import Dropdown from "@components/common/Dropdown";
import HeadTag from "@components/common/HeadTag";
import Button from "@components/common/Button";
import CommentListItem from "@components/board/CommentListItem";
import Textarea from "@components/common/Textarea";
import Modal from "@components/common/Modal";
import ConfirmContent from "@components/content/ConfirmContent";

import useRequest from "@hooks/useRequest.ts";
import useTextarea from "@hooks/useTextarea.ts";
import getTimeStamp from "@util/getTimeStamp.ts";
import generateLinksAndLineBreaks from "@util/generateLinksAndLineBreaks.ts";
import {IInquiryProps} from "@/types/componentProps.ts";
import {IComment} from "@/types/comment.ts";
import {inquiryCategories} from "@constants/inquiryCategories.ts";
import {useUserInfoStore} from "@store/useUserStore.ts";
import {headerCategories} from "@constants/headerCategories.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {placeholderCategories} from "@constants/placeholderCategories.ts";
import {messageCategories} from "@constants/messageCategories.ts";

import {
    BtnsWrapper, CommentBtnWrapper, CommentFormWrapper, CommentListWrapper,
    Container,
    ContentWrapper,
    CountsWrapper,
    DateWrapper, EmptyMessage,
    InquiryInfoWrapper,
    InquiryWrapper, LikeBtnWrapper, TextareaWrapper
} from "./style.ts";
import {TagWrapper, WriterWrapper} from "@components/board/InquiryFeedbackListItem/style.ts";
import {ProfileImgWrapper} from "@components/board/CommentListItem/style.ts";

import noProfile from "@assets/icons/no_profile.svg";
import views from "@assets/icons/visible.svg";
import likes from "@assets/icons/feedback.svg";
import chat from "@assets/icons/chat.svg";
import send from "@assets/icons/send.svg";
import deleteIcon from "@assets/icons/delete.svg";
import editIcon from "@assets/icons/edit.svg";


const InquiryDetailPage:FC = () => {
    const [inquiry, setInquiry] = useState<IInquiryProps>();
    const [comments, setComments] = useState<IComment[]>([]);
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [emptyCommentContent, setEmptyCommentContent] = useState<boolean>(false);
    const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);

    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const navigate = useNavigate();
    const {inquiryId} = useParams();

    const {userInfo} = useUserInfoStore();
    const {lang} = useThemeStore();

    const {isLoading: inquiryIsLoading, errorText: inquiryErrorText, sendRequest: inquirySendRequest, clearError: inquiryClearError} = useRequest();
    const {errorText: deleteInquiryErrorText, sendRequest: deleteInquirySendRequest, clearError: deleteInquiryClearError} = useRequest();
    const {errorText: likeInquiryErrorText, sendRequest: likeInquirySendRequest, clearError: likeInquiryClearError} = useRequest();
    const {errorText: commentErrorText, sendRequest: commentSendRequest, clearError: commentClearError} = useRequest();
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
            const response = await inquirySendRequest({
                url: `/inquiries/${inquiryId}`
            });
            setInquiry(response.data.inquiry);
            setIsLiked(response.data.inquiry.isLiked);
            setComments(response.data.comments);
        } catch (err) {
            console.error("문의 조회 중 에러 발생: ", err);
        }
    }, [inquirySendRequest, inquiryId]);

    useEffect(() => {
        fetchInquiry();
    }, [fetchInquiry]);

    // 문의 좋아요
    const likeInquiry = async () => {
        try {
            const response = await likeInquirySendRequest({
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
            await deleteInquirySendRequest({
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
            console.error("댓글 생성 요청 중 에러 발생: ", err);
        }
    };

    // 댓글 버튼 클릭 시
    const commentClickHandler = () => {
        textareaRef.current?.focus();
    };


    return (
        <Container>
            <HeadTag title={inquiry?.title || headerCategories.inquiryDetail[lang]}/>

            <Header leftChild={<ArrowBack/>} centerText={headerCategories.inquiryDetail[lang]}/>

            {!inquiryIsLoading && inquiry ?
                <>
                    {/*문의 부분*/}
                    <InquiryWrapper>
                        <InquiryInfoWrapper>
                            <div>
                                <div>
                                    <TagWrapper tag={inquiry.category}>{inquiryCategories[inquiry.category][lang]}</TagWrapper>
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
                                    <div>
                                        <ReactSVG src={noProfile}/>
                                    </div>
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

                        <ContentWrapper>
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
                    <CommentFormWrapper onSubmit={submitHandler}>
                        <ProfileImgWrapper>
                            <ReactSVG src={noProfile}/>
                        </ProfileImgWrapper>
                        <TextareaWrapper
                            textLength={text.length}
                        >
                            <Textarea
                                ref={textareaRef}
                                name={"comment"}
                                showCount={false}
                                placeholder={placeholderCategories.comment[lang]}
                                countOfText={countOfText}
                                changeTextareaHandler={handleTextChange}
                                text={text}
                                isScrolled={false}
                            />
                            {text.trim().length > 0 &&
                              <Button type={"submit"} content={<ReactSVG src={send}/> as ReactElement} width={"fit"} color={"approval"} scale={"small"}/>
                            }
                        </TextareaWrapper>
                    </CommentFormWrapper>

                    {comments.length === 0 ?
                        <EmptyMessage>{messageCategories.emptyComment[lang]}</EmptyMessage>
                        :
                        <CommentListWrapper>
                            {comments.map((comment, index) => (
                                <CommentListItem
                                    key={`${index} ${comment._id}`}
                                    _id={comment._id}
                                    content={comment.content}
                                    author={comment.author}
                                    authorId={comment.authorId}
                                    likes={comment.likes}
                                    createdAt={comment.createdAt}
                                    isLiked={comment.isLiked}
                                />
                            ))}
                        </CommentListWrapper>
                    }
                </>
                :
                <LoadingLoop/>
            }

            {inquiryErrorText &&
              <Toast text={inquiryErrorText} setToast={inquiryClearError} type={"error"}/>
            }

            {deleteInquiryErrorText &&
              <Toast text={deleteInquiryErrorText} setToast={deleteInquiryClearError} type={"error"}/>
            }

            {commentErrorText &&
              <Toast text={commentErrorText} setToast={commentClearError} type={"error"}/>
            }

            {likeInquiryErrorText &&
              <Toast text={likeInquiryErrorText} setToast={likeInquiryClearError} type={"error"}/>
            }

            {emptyCommentContent &&
              <Toast text={messageCategories.emptyCommentError[lang]} setToast={() => setEmptyCommentContent(false)} type={"error"}/>
            }

            {showConfirmModal &&
                <Modal
                  content={
                    <ConfirmContent
                        text={messageCategories.delete[lang]}
                        leftBtn={<Button type={"button"} content={buttonCategories.close[lang]} color={"third"} scale={"normal"} width={"full"} onClick={() => setShowConfirmModal(false)}/> }
                        rightBtn={<Button type={"submit"} content={buttonCategories.delete[lang]} color={"danger"} scale={"normal"} width={"full"} onClick={deleteInquiry}/>}
                    />
                  }
                  setModal={() => setShowConfirmModal(false)}
                  type={"popup"}
                />
            }
        </Container>
    );
};

export default InquiryDetailPage;