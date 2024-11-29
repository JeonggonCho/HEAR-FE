import {useCallback, useEffect, useState} from "react";
import CardLoading from "@components/skeleton/CardLoading";
import InquiryFeedbackListItem from "@components/feedback/InquiryFeedbackListItem";
import Empty from "@components/common/Empty";
import Flex from "@components/common/Flex";
import useRequest from "@hooks/useRequest.ts";
import fetchInquiriesApi from "@api/inquiry/fetchInquiriesApi.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {IInquiryProps} from "@/types/componentProps.ts";
import {messageCategories} from "@constants/messageCategories.ts";


const InquiryList = () => {
    const [inquiries, setInquiries] = useState<IInquiryProps[]>([]);

    const {lang} = useThemeStore();
    const {sendRequest, isLoading} = useRequest();

    const fetchInquiries = useCallback(async () => {
        try {
            const responseData = await fetchInquiriesApi({sendRequest});
            setInquiries(responseData);
        } catch (err) {
            console.error("문의 목록 조회 중 에러 발생: ", err);
        }
    }, [sendRequest]);

    useEffect(() => {
        fetchInquiries();
    }, [fetchInquiries]);

    return (
        <Flex direction={"column"} gap={14} style={{margin: "24px"}}>
            {isLoading ?
                <>
                    <CardLoading heightValue={"160px"}/>
                    <CardLoading heightValue={"160px"}/>
                    <CardLoading heightValue={"160px"}/>
                    <CardLoading heightValue={"160px"}/>
                </>
                :
                <>
                    {inquiries.length !== 0 ? inquiries.map((value, idx) => (
                            <InquiryFeedbackListItem key={idx} type={"inquiry"} {...value}/>
                        ))
                        :
                        <Empty
                            title={messageCategories.emptyInquiry[lang]}
                            message={messageCategories.makeInquiry[lang]}
                        />
                    }
                </>
            }
        </Flex>
    );
};

export default InquiryList;