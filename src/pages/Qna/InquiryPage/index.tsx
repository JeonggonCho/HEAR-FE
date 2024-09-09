import {useEffect, useState} from "react";

import Header from "@components/Header";
import ColoredBtn from "@components/ColoredBtn";
import InquiryFeedbackListItem from "@components/InquiryFeedbackListItem";
import CreateBtn from "@components/CreateBtn";
import Empty from "@components/Empty";
import LoadingLoop from "@components/LoadingLoop";
import Modal from "@components/Modal";

import useRequest from "@hooks/useRequest.ts";
import {IInquiryProps} from "@/types/componentProps.ts";

import {Container, HeaderWrapper} from "./style.ts";
import inquiry from "@assets/images/inquiry.png";
import ErrorContent from "@components/ErrorContent";

const InquiryHeaderLeft = () => (
    <HeaderWrapper>
        <img src={inquiry} alt="모형제작실 문의"/>
        <h2>문의</h2>
    </HeaderWrapper>
);

const InquiryHeaderRight = () => (
    <ColoredBtn
        type={"link"}
        content={"피드백"}
        width={"fit"}
        color={"primary"}
        scale={"small"}
        to={"/feedback"}
    />
);

const InquiryPage = () => {
    const [inquiries, setInquiries] = useState<IInquiryProps[]>([]);

    const {isLoading, errorText, sendRequest, clearError} = useRequest();

    useEffect(() => {
        const fetchInquiries = async () => {
            try {
                const response = await sendRequest({
                    url: "/inquiries",
                });
                setInquiries(response.data);
            } catch (err) {
                console.error("문의 목록 조회 중 에러 발생: ", err);
            }
        };
        fetchInquiries();
    }, [sendRequest]);

    return (
        <Container>
            <Header leftChild={<InquiryHeaderLeft/>} rightChild={<InquiryHeaderRight/>}/>
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
                            title={"작성된 문의가 아직 없어요"}
                            message={"모형제작실에 관해서 궁금한 점이 있으시면 언제든 물어보세요"}
                        />
                    }

                    <CreateBtn to={"/inquiry/new"}/>
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

export default InquiryPage;