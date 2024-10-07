import {FC, useCallback, useEffect, useState} from "react";

import InquiryFeedbackListItem from "@components/communication/InquiryFeedbackListItem";
import FloatingButton from "@components/common/FloatingButton";
import Empty from "@components/common/Empty";
import Modal from "@components/common/Modal";
import ErrorContent from "@components/content/ErrorContent";

import useRequest from "@hooks/useRequest.ts";
import {IFeedbackProps} from "@/types/componentProps.ts";
import {messageCategories} from "@constants/messageCategories.ts";
import {pageDescriptionCategories} from "@constants/pageDescriptionCategories.ts";
import {useThemeStore} from "@store/useThemeStore.ts";

import {Container} from "./style.ts";
import CardLoading from "@components/skeleton/CardLoading";


const FeedbackPage:FC = () => {
    const [feedback, setFeedback] = useState<IFeedbackProps[]>([]);

    const {lang} = useThemeStore();

    const {isLoading, errorText, sendRequest, clearError} = useRequest();

    const fetchFeedback = useCallback(async () => {
        try {
            const response = await sendRequest({
                url: "/feedback",
            });
            setFeedback(response.data);
        } catch (err) {
            console.error("피드백 목록 조회 중 에러 발생: ", err);
        }
    }, [sendRequest]);

    useEffect(() => {
        fetchFeedback();
    }, [fetchFeedback]);

    return (
        <Container>
            <p>{pageDescriptionCategories.feedback[lang]}</p>

            {isLoading ?
                <div style={{display: "flex", flexDirection: "column", gap: 16}}>
                    <CardLoading heightValue={"90px"}/>
                    <CardLoading heightValue={"90px"}/>
                    <CardLoading heightValue={"90px"}/>
                    <CardLoading heightValue={"90px"}/>
                </div>
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

            <FloatingButton to={"/communication/feedback/new"}/>

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

export default FeedbackPage;