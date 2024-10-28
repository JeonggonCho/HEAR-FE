import {FC, useCallback, useEffect, useState} from "react";

import Header from "@components/common/Header";
import ArrowBack from "@components/common/ArrowBack";
import LoadingLoop from "@components/common/LoadingLoop";
import HeadTag from "@components/common/HeadTag";
import InquiryFeedbackListItem from "@components/board/InquiryFeedbackListItem";
import Empty from "@components/common/Empty";

import useRequest from "@hooks/useRequest.ts";
import {IInquiryProps} from "@/types/componentProps.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {useToastStore} from "@store/useToastStore.ts";
import {headerCategories} from "@constants/headerCategories.ts";
import {messageCategories} from "@constants/messageCategories.ts";

import {InquiryListItemWrapper} from "./style.ts";

const MyInquiriesPage:FC = () => {
    const [inquiries, setInquiries] = useState<IInquiryProps[]>([]);

    const {lang} = useThemeStore();
    const {showToast} = useToastStore();
    const {isLoading, sendRequest, errorText, clearError} = useRequest();

    // 내 문의 내역 조회
    const fetchMyInquiries = useCallback(async () => {
        try {
            const response = await sendRequest({
               url: "/inquiries/me",
            });
            if (response.data) {
                setInquiries(response.data);
            }
        } catch (err) {
            console.error("내 문의 내역 조회 중 에러 발생: ", err);
        }
    }, [sendRequest, setInquiries]);

    useEffect(() => {
        fetchMyInquiries();
    }, [fetchMyInquiries]);

    // 에러 메시지
    useEffect(() => {
        if (errorText) {
            showToast(errorText, "error");
            const errorTimer = setTimeout(clearError, 6000);
            return () => clearTimeout(errorTimer);
        }
    }, [errorText, clearError, showToast]);

    return (
        <>
            <HeadTag title={headerCategories.myInquiries[lang]}/>

            <Header leftChild={<ArrowBack/>} centerText={headerCategories.myInquiries[lang]}/>

            {isLoading ?
                <LoadingLoop/>
                :
                <>
                    {inquiries.length > 0 ?
                        <InquiryListItemWrapper>
                            {inquiries.map((inquiry, index) => (
                                <InquiryFeedbackListItem
                                    key={`${index}-${inquiry.title}`}
                                    title={inquiry.title}
                                    type={"inquiry"}
                                    _id={inquiry._id}
                                    createdAt={inquiry.createdAt}
                                    creator={inquiry.creator}
                                    category={inquiry.category}
                                    views={inquiry.views}
                                    likes={inquiry.likes}
                                    comments={inquiry.comments}
                                    content={inquiry.content}
                                />
                            ))}
                        </InquiryListItemWrapper>
                        :
                        <Empty
                            title={messageCategories.emptyInquiry[lang]}
                            message={messageCategories.makeInquiry[lang]}
                        />
                    }
                </>
            }
        </>
    );
};

export default MyInquiriesPage;