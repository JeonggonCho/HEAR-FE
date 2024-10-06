import {FC, useCallback, useEffect, useMemo, useState} from "react";
import {useParams} from "react-router-dom";

import Header from "@components/common/Header";
import ArrowBack from "@components/common/ArrowBack";
import LoadingLoop from "@components/common/LoadingLoop";
import Modal from "@components/common/Modal";
import ErrorContent from "@components/content/ErrorContent";
import Dropdown from "@components/common/Dropdown";
import ChatBubble from "@components/common/ChatBubble";

import useRequest from "@hooks/useRequest.ts";
import {IInquiryProps} from "@/types/componentProps.ts";
import {inquiryCategories} from "@constants/inquiryCategories.ts";
import getTimeStamp from "@util/getTimeStamp.ts";
import {useUserInfoStore} from "@store/useUserStore.ts";
import {headerCategories} from "@constants/headerCategories.ts";
import {useThemeStore} from "@store/useThemeStore.ts";

import {Container, InquiryInfoWrapper} from "./style.ts";

import Q from "@assets/images/Q.png";

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
            <Header leftChild={<ArrowBack/>} centerText={headerCategories.inquiryDetail[lang]}/>
            {!isLoading && inquiry ?
                <>
                    <InquiryInfoWrapper>
                        <div>
                            <span>{inquiryCategories[inquiry.category][lang]}</span>
                            <h2>{inquiry.title}</h2>
                        </div>

                        <div>
                            <span>{inquiry.creator}</span>
                            <div>
                                <span>{timeStamp}</span>
                                {inquiryId && inquiry.creatorId === userInfo?.userId &&
                                  <Dropdown type={"inquiry"} id={inquiryId}/>
                                }
                            </div>
                        </div>
                        <hr/>
                    </InquiryInfoWrapper>

                    <div>
                        {inquiry.content &&
                          <ChatBubble
                            text={inquiry.content}
                            isMine={true}
                            showProfile={true}
                            profile={Q}
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

export default InquiryDetailPage;