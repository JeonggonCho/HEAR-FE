import {FC, useEffect, useMemo, useState} from "react";
import {useParams} from "react-router-dom";

import Header from "@components/Header";
import ArrowBack from "@components/ArrowBack";
import LoadingLoop from "@components/LoadingLoop";
import Modal from "@components/Modal";
import ErrorContent from "@components/ErrorContent";
import Dropdown from "@components/Dropdown";
import ChatBubble from "@components/ChatBubble";

import useRequest from "@hooks/useRequest.ts";
import {IInquiryProps} from "@/types/componentProps.ts";
import {inquiryCategoriesValues} from "@constants/inquiryCategories.ts";
import getTimeStamp from "@util/getTimeStamp.ts";

import {Container} from "./style.ts";

import Q from "@assets/images/Q.png";

const InquiryDetailPage:FC = () => {
    const [inquiry, setInquiry] = useState<IInquiryProps>();

    const {inquiryId} = useParams();

    const timeStamp = useMemo(() => {
        return inquiry?.createdAt ? getTimeStamp(inquiry.createdAt) : '';
    }, [inquiry?.createdAt]);

    const {isLoading, errorText, sendRequest, clearError} = useRequest();

    useEffect(() => {
        const fetchInquiry = async () => {
            try {
                const response = await sendRequest({
                    url: `/inquiries/${inquiryId}`
                });
                setInquiry(response.data);
            } catch (err) {
                console.error("문의 조회 중 에러 발생: ", err);
            }
        };
        fetchInquiry();
    }, [sendRequest, inquiryId]);

    return (
        <Container>
            <Header leftChild={<ArrowBack/>} centerText={"문의"}/>
            {!isLoading && inquiry ?
                <>
                    <span>{inquiryCategoriesValues[inquiry.category]}</span>
                    <h2>{inquiry.title}</h2>

                    <div>
                        <span>{inquiry.creator}</span>
                        <div>
                            <span>{timeStamp}</span>
                            {inquiryId &&
                                <Dropdown type={"inquiry"} id={inquiryId}/>
                            }
                        </div>
                    </div>
                    <hr/>
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