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
import {IInquiryProps} from "@/types/componentProps.ts";
import {inquiryCategories} from "@constants/inquiryCategories.ts";
import getTimeStamp from "@util/getTimeStamp.ts";
import {useUserInfoStore} from "@store/useUserStore.ts";
import {headerCategories} from "@constants/headerCategories.ts";
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
import {TagWrapper, WriterWrapper} from "@components/board/InquiryFeedbackListItem/style.ts";

import noProfile from "@assets/icons/no_profile.svg";
import views from "@assets/icons/visible.svg";
import likes from "@assets/icons/feedback.svg";
import comments from "@assets/icons/chat.svg";

const InquiryDetailPage:FC = () => {
    const [inquiry, setInquiry] = useState<IInquiryProps>();
    const [isLiked, setIsLiked] = useState<boolean>(false);

    const {inquiryId} = useParams();

    const {userInfo} = useUserInfoStore();
    const {lang} = useThemeStore();

    const timeStamp = useMemo(() => {
        return inquiry?.createdAt ? getTimeStamp(inquiry.createdAt, lang) : '';
    }, [inquiry?.createdAt]);

    const {isLoading, errorText, sendRequest, clearError} = useRequest();
    const {errorText: likeErrorText, sendRequest: likeSendRequest, clearError: likeClearError} = useRequest();

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
                                        <ReactSVG src={comments}/>
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
                                <span>좋아요</span>
                            </LikeBtnWrapper>
                            <CommentBtnWrapper>
                                <ReactSVG src={comments}/>
                                <span>댓글</span>
                            </CommentBtnWrapper>
                        </BtnsWrapper>
                    </InquiryWrapper>

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

export default InquiryDetailPage;