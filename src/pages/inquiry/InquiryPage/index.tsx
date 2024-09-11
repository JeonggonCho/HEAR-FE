import React, {FC, useCallback, useEffect, useState} from "react";

import InquiryFeedbackListItem from "@components/InquiryFeedbackListItem";
import CreateBtn from "@components/CreateBtn";
import Empty from "@components/Empty";
import LoadingLoop from "@components/LoadingLoop";
import Modal from "@components/Modal";
import ErrorContent from "@components/ErrorContent";

import useRequest from "@hooks/useRequest.ts";
import {IInquiryProps} from "@/types/componentProps.ts";

import {Container} from "./style.ts";
import {useUserDataStore} from "@store/useUserStore.ts";

const InquiryPage:FC = () => {
    const [inquiries, setInquiries] = useState<IInquiryProps[]>([]);

    const {userData} = useUserDataStore();

    const {isLoading, errorText, sendRequest, clearError} = useRequest();

    const fetchInquiries = useCallback(async () => {
        try {
            const response = await sendRequest({ url: "/inquiries" });
            setInquiries(response.data);
        } catch (err) {
            console.error("문의 목록 조회 중 에러 발생: ", err);
        }
    }, [sendRequest]);

    useEffect(() => {
        fetchInquiries();
    }, [fetchInquiries]);

    return (
        <Container>
            {isLoading ?
                <LoadingLoop/>
                :
                <>
                    <p>
                        문의사항은 모형제작실 조교에게 전달되며,<br/>
                        답변을 받는 데 시간이 소요될 수 있습니다
                    </p>

                    {inquiries.length !== 0 ? inquiries.map((value, idx) => (
                            <InquiryFeedbackListItem key={idx} type={"inquiry"} {...value}/>
                        ))
                        :
                        <Empty
                            title={"작성하신 문의가 아직 없어요"}
                            message={"모형제작실에 관해서 궁금한 점에 대해 문의 주세요"}
                        />
                    }

                    {userData?.role !== "manager" &&
                        <CreateBtn to={"/communication/inquiry/new"}/>
                    }
                </>
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

export default React.memo(InquiryPage);