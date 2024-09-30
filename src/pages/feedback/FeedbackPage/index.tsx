import {FC, useCallback, useEffect, useState} from "react";

import InquiryFeedbackListItem from "@components/communication/InquiryFeedbackListItem";
import FloatingButton from "@components/common/FloatingButton";
import Empty from "@components/common/Empty";
import LoadingLoop from "@components/common/LoadingLoop";
import Modal from "@components/common/Modal";
import ErrorContent from "@components/content/ErrorContent";

import useRequest from "@hooks/useRequest.ts";
import {IFeedbackProps} from "@/types/componentProps.ts";

import {Container} from "./style.ts";

const FeedbackPage:FC = () => {
    const [feedback, setFeedback] = useState<IFeedbackProps[]>([]);

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
            {isLoading ?
                <LoadingLoop/>
                :
                <>
                    <p>
                        피드백은 애플리케이션 개발자에게 전달되며,<br/>
                        해당 앱 업데이트에 도움이 됩니다
                    </p>

                    {feedback.length !== 0 ? feedback.map((value, idx) => (
                            <InquiryFeedbackListItem key={idx} type={"feedback"} {...value}/>
                        ))
                        :
                        <Empty
                            title={"작성하신 피드백이 아직 없어요"}
                            message={"서비스에 대한 여러분의 피드백을 남겨주세요"}
                        />
                    }

                    <FloatingButton to={"/communication/feedback/new"}/>
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

export default FeedbackPage;