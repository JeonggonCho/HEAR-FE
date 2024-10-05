import React, {FC, useCallback, useEffect, useState} from "react";

import InquiryFeedbackListItem from "@components/communication/InquiryFeedbackListItem";
import FloatingButton from "@components/common/FloatingButton";
import Empty from "@components/common/Empty";
import LoadingLoop from "@components/common/LoadingLoop";
import Modal from "@components/common/Modal";
import ErrorContent from "@components/content/ErrorContent";

import useRequest from "@hooks/useRequest.ts";
import {IInquiryProps} from "@/types/componentProps.ts";
import {useUserDataStore} from "@store/useUserStore.ts";
import {messageCategories} from "@constants/messageCategories.ts";
import {pageDescriptionCategories} from "@constants/pageDescriptionCategories.ts";
import {useThemeStore} from "@store/useThemeStore.ts";

import {Container} from "./style.ts";

const InquiryPage:FC = () => {
    const [inquiries, setInquiries] = useState<IInquiryProps[]>([]);

    const {userData} = useUserDataStore();
    const {lang} = useThemeStore();

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
                    <p>{pageDescriptionCategories.inquiry[lang]}</p>

                    {inquiries.length !== 0 ? inquiries.map((value, idx) => (
                            <InquiryFeedbackListItem key={idx} type={"inquiry"} {...value}/>
                        ))
                        :
                        <Empty
                            title={messageCategories.emptyInquiry[lang]}
                            message={messageCategories.makeInquiry[lang]}
                        />
                    }

                    {userData?.role !== "manager" &&
                        <FloatingButton to={"/communication/inquiry/new"}/>
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