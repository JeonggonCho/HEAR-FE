import {useEffect, useMemo, useState} from "react";
import {useParams} from "react-router-dom";

import Header from "@components/Header";
import ArrowBack from "@components/ArrowBack";
import LoadingLoop from "@components/LoadingLoop";
import Modal from "@components/Modal";

import useRequest from "@hooks/useRequest.ts";
import {IInquiryProps} from "@types/componentProps.ts";
import {inquiryCategoriesValues} from "@constants/inquiryCategories.ts";
import getTimeStamp from "@util/getTimeStamp.ts";

import {Container} from "./style.ts";
import ErrorContent from "@components/ErrorContent";

const InquiryDetailPage = () => {
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
                    <p>{timeStamp}</p>
                    <p>{inquiry.creator}</p>
                    <p>{inquiry.content}</p>
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