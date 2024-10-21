import {FC, ReactElement, useCallback, useEffect, useMemo, useState} from "react";
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
import {IInquiryProps} from "@/types/componentProps.ts";
import {inquiryCategories} from "@constants/inquiryCategories.ts";
import getTimeStamp from "@util/getTimeStamp.ts";
import {useUserInfoStore} from "@store/useUserStore.ts";
import {headerCategories} from "@constants/headerCategories.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";

import {
    BtnsWrapper, CommentBtnWrapper, CommentFormWrapper, CommentListWrapper,
    Container,
    ContentWrapper,
    CountsWrapper,
    DateWrapper,
    InquiryInfoWrapper,
    InquiryWrapper, LikeBtnWrapper
} from "./style.ts";
import {TagWrapper, WriterWrapper} from "@components/board/InquiryFeedbackListItem/style.ts";
import {ProfileImgWrapper} from "@components/board/CommentListItem/style.ts";

import noProfile from "@assets/icons/no_profile.svg";
import views from "@assets/icons/visible.svg";
import likes from "@assets/icons/feedback.svg";
import chat from "@assets/icons/chat.svg";
import send from "@assets/icons/send.svg";


const dummy = [
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

    const {inquiryId} = useParams();

    const {userInfo} = useUserInfoStore();
    const {lang} = useThemeStore();

    const {isLoading, errorText, sendRequest, clearError} = useRequest();
    const {errorText: likeErrorText, sendRequest: likeSendRequest, clearError: likeClearError} = useRequest();
    const {text, countOfText, handleTextChange} = useTextarea();

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

    return (
        <Container>
            <HeadTag title={inquiry?.title || headerCategories.inquiryDetail[lang]}/>

            <Header leftChild={<ArrowBack/>} centerText={headerCategories.inquiryDetail[lang]}/>

            {!isLoading && inquiry ?
                <>
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
                                        <span>{inquiry.views}</span>
                                    </div>
                                    <div>
                                        <ReactSVG src={likes}/>
                                        <span>{inquiry.likes}</span>
                                    </div>
                                    <div>
                                        <ReactSVG src={chat}/>
                                        <span>{inquiry.views}</span>
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
                            <CommentBtnWrapper>
                                <ReactSVG src={chat}/>
                                <span>{buttonCategories.comment[lang]}</span>
                            </CommentBtnWrapper>
                        </BtnsWrapper>
                    </InquiryWrapper>

                    <CommentFormWrapper>
                        <ProfileImgWrapper>
                            <ReactSVG src={noProfile}/>
                        </ProfileImgWrapper>
                        <div>
                            <Textarea
                                name={""}
                                showCount={false}
                                height={50}
                                placeholder={"댓글을 작성해주세요"}
                                countOfText={countOfText}
                                handleTextChange={handleTextChange}
                                text={text}
                            />
                            <Button type={"submit"} content={<ReactSVG src={send}/> as ReactElement} width={"fit"}
                                    color={"approval"} scale={"small"}/>
                        </div>
                    </CommentFormWrapper>

                    {comments.length === 0 ?
                        <div>
                            작성된 답변이 없습니다
                        </div>
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
        </Container>
    );
};

export default InquiryDetailPage;