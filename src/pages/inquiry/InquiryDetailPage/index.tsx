import {FC, FormEvent, ReactElement, useCallback, useEffect, useMemo, useRef, useState} from "react";
import {useParams} from "react-router-dom";
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

import useRequest from "@hooks/useRequest.ts";
import useTextarea from "@hooks/useTextarea.ts";
import getTimeStamp from "@util/getTimeStamp.ts";
import {IInquiryProps} from "@/types/componentProps.ts";
import {inquiryCategories} from "@constants/inquiryCategories.ts";
import {useUserInfoStore} from "@store/useUserStore.ts";
import {headerCategories} from "@constants/headerCategories.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";

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
import {placeholderCategories} from "@constants/placeholderCategories.ts";
import {messageCategories} from "@constants/messageCategories.ts";


const dummy:any[] = [
    {
        _id: 1,
        content: "공감해요",
        author: "조정곤",
        likes: 6,
        createdAt: new Date(),
    },
    {
        _id: 2,
        content: "너무 좋아요",
        author: "이철수",
        likes: 4,
        createdAt: new Date(),
    },
    {
        _id: 3,
        content: "음... 그렇구나",
        author: "조정곤",
        likes: 3,
        createdAt: new Date(),
    },
    {
        _id: 4,
        content: "오 몰랐음",
        author: "김수찬",
        likes: 2,
        createdAt: new Date(),
    },
    {
        _id: 5,
        content: "good!!!",
        author: "이민수",
        likes: 10,
        createdAt: new Date(),
    },
];


const InquiryDetailPage:FC = () => {
    const [inquiry, setInquiry] = useState<IInquiryProps>();
    const [comments, setComments] = useState(dummy);
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [emptyCommentContent, setEmptyCommentContent] = useState<boolean>(false);

    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const {inquiryId} = useParams();

    const {userInfo} = useUserInfoStore();
    const {lang} = useThemeStore();

    const {isLoading, errorText, sendRequest, clearError} = useRequest();
    const {errorText: likeErrorText, sendRequest: likeSendRequest, clearError: likeClearError} = useRequest();
    const {text, countOfText, handleTextChange} = useTextarea(); // 댓글 textarea

    // 문의 생성일 스탬프
    const timeStamp = useMemo(() => {
        return inquiry?.createdAt ? getTimeStamp(inquiry.createdAt, lang) : '';
    }, [inquiry?.createdAt]);

    // 문의 디테일 조회
    const fetchInquiry = useCallback(async () => {
        try {
            const response = await sendRequest({
                url: `/inquiries/${inquiryId}`
            });
            setInquiry(response.data);
            setIsLiked(response.data.isLiked);
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

    // 댓글 생성 요청하기
    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(text);
        const data = {};
        if (text.trim().length === 0) {
            setEmptyCommentContent(true);
            return;
        }
        try {
            const response = await sendRequest({
                url: "",
                method: "post",
                data: data,
            });
            if (response.data) {
                console.log(response.data)
            }
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

            {!isLoading && inquiry ?
                <>
                    {/*문의 부분*/}
                    <InquiryWrapper>
                        <InquiryInfoWrapper>
                            <div>
                                <div>
                                    <TagWrapper tag={inquiry.category}>{inquiryCategories[inquiry.category][lang]}</TagWrapper>
                                    <div>
                                        {inquiryId && inquiry && inquiry.creatorId === userInfo?.userId &&
                                          <Dropdown type={"inquiry"} id={inquiryId}/>
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
                            <p>{inquiry.content}</p>
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
                            {comments.map((comment) => (
                                <CommentListItem key={comment._id} comment={comment}/>
                            ))}
                        </CommentListWrapper>
                    }
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

            {emptyCommentContent &&
              <Toast text={messageCategories.emptyCommentError[lang]} setToast={() => setEmptyCommentContent(false)} type={"error"}/>
            }
        </Container>
    );
};

export default InquiryDetailPage;