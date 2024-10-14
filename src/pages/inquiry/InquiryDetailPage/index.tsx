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

import {Container, ContentWrapper, InquiryInfoWrapper} from "./style.ts";
import {TagWrapper, WriterWrapper} from "@components/board/InquiryFeedbackListItem/style.ts";

import noProfile from "@assets/icons/no_profile.svg";

const InquiryDetailPage:FC = () => {
    const [inquiry, setInquiry] = useState<IInquiryProps>();

    const {inquiryId} = useParams();

    const {userInfo} = useUserInfoStore();
    const {lang} = useThemeStore();

    const timeStamp = useMemo(() => {
        return inquiry?.createdAt ? getTimeStamp(inquiry.createdAt, lang) : '';
    }, [inquiry?.createdAt]);

    const {isLoading, errorText, sendRequest, clearError} = useRequest();

    const fetchInquiry = useCallback(async () => {
        try {
            const response = await sendRequest({
                url: `/inquiries/${inquiryId}`
            });
            setInquiry(response.data);
        } catch (err) {
            console.error("문의 조회 중 에러 발생: ", err);
        }
    }, [sendRequest, inquiryId]);

    useEffect(() => {
        fetchInquiry();
    }, [fetchInquiry]);

    return (
        <Container>
            <HeadTag title={inquiry?.title || headerCategories.inquiryDetail[lang]}/>

            <Header leftChild={<ArrowBack/>} centerText={headerCategories.inquiryDetail[lang]}/>
            {!isLoading && inquiry ?
                <>
                    <InquiryInfoWrapper>
                        <div>
                            <TagWrapper tag={inquiry.category}>{inquiryCategories[inquiry.category][lang]}</TagWrapper>
                            <h2>{inquiry.title}</h2>
                        </div>

                        <div>
                            <WriterWrapper>
                                <div>
                                    <ReactSVG src={noProfile}/>
                                </div>
                                <span>{inquiry.creator}</span>
                            </WriterWrapper>
                            <div>
                            <span>{timeStamp}</span>
                                {inquiryId && inquiry.creatorId === userInfo?.userId &&
                                  <Dropdown type={"inquiry"} id={inquiryId}/>
                                }
                            </div>
                        </div>
                    </InquiryInfoWrapper>

                    <ContentWrapper>
                        <p>{inquiry.content}</p>
                    </ContentWrapper>

                    <div>
                        작성된 답변이 없습니다
                    </div>
                </>
                :
                <LoadingLoop/>
            }

            {errorText &&
                <Toast text={errorText} setToast={clearError}/>
            }
        </Container>
    );
};

export default InquiryDetailPage;