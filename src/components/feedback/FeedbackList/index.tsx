import {useCallback, useEffect, useState} from "react";
import CardLoading from "@components/skeleton/CardLoading";
import InquiryFeedbackListItem from "@components/feedback/InquiryFeedbackListItem";
import Empty from "@components/common/Empty";
import Flex from "@components/common/Flex";
import useRequest from "@hooks/useRequest.ts";
import fetchFeedbacksApi from "@api/feedback/fetchFeedbacksApi.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {IFeedbackProps} from "@/types/componentProps.ts";
import {messageCategories} from "@constants/messageCategories.ts";


const FeedbackList = () => {
    const [feedback, setFeedback] = useState<IFeedbackProps[]>([]);

    const {lang} = useThemeStore();
    const {isLoading, sendRequest} = useRequest();

    const fetchFeedback = useCallback(async () => {
        try {
            const responseData = await fetchFeedbacksApi({sendRequest});
            setFeedback(responseData);
        } catch (err) {
            console.error("피드백 목록 조회 중 에러 발생: ", err);
        }
    }, [sendRequest]);

    useEffect(() => {
        fetchFeedback();
    }, [fetchFeedback]);

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
                    {feedback.length !== 0 ? feedback.map((value, idx) => (
                            <InquiryFeedbackListItem key={idx} type={"feedback"} {...value}/>
                        ))
                        :
                        <Empty
                            title={messageCategories.emptyFeedback[lang]}
                            message={messageCategories.makeFeedback[lang]}
                        />
                    }
                </>
            }
        </Flex>
    );
};

export default FeedbackList;