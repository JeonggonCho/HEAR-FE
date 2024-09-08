import {useEffect, useState} from "react";

import Header from "@components/Header";
import ColoredBtn from "@components/ColoredBtn";
import InquiryFeedbackListItem from "@components/InquiryFeedbackListItem";
import CreateBtn from "@components/CreateBtn";
import Empty from "@components/Empty";
import LoadingLoop from "@components/LoadingLoop";
import Modal from "@components/Modal";

import useRequest from "@hooks/useRequest.ts";
import {IFeedbackProps} from "@/types/componentProps.ts";

import {Container, HeaderWrapper} from "./style.ts";
import inquiry from "@assets/images/inquiry.png";
import ErrorContent from "@components/ErrorContent";

const FeedbackHeaderLeft = () => (
    <HeaderWrapper>
        <img src={inquiry} alt="피드백"/>
        <h2>피드백</h2>
    </HeaderWrapper>
);

const FeedbackHeaderRight = () => (
    <ColoredBtn
        type={"link"}
        content={"문의"}
        width={"fit"}
        color={"second"}
        scale={"small"}
        to={"/inquiry"}
    />
);

const FeedbackPage = () => {
    const [feedback, setFeedback] = useState<IFeedbackProps[]>([]);

    const {isLoading, errorText, sendRequest, clearError} = useRequest();

    useEffect(() => {
        const fetchFeedback = async () => {
            try {
                const response = await sendRequest({
                    url: "/feedback",
                });
                setFeedback(response.data);
            } catch (err) {
                console.error("피드백 목록 조회 중 에러 발생: ", err);
            }
        };
        fetchFeedback();
    }, [sendRequest]);

    return (
        <Container>
            <Header leftChild={<FeedbackHeaderLeft/>} rightChild={<FeedbackHeaderRight/>}/>
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
                            title={"작성된 피드백이 아직 없어요"}
                            message={"서비스에 대한 여러분의 피드백을 남겨주세요"}
                        />
                    }

                    <CreateBtn to={"/feedback/new"}/>
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