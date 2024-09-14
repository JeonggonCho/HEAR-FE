import {FC, useCallback, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {z} from "zod";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import Header from "@components/Header";
import ArrowBack from "@components/ArrowBack";
import LoadingLoop from "@components/LoadingLoop";
import Modal from "@components/Modal";
import ErrorContent from "@components/ErrorContent";
import InputWithLabel from "@components/InputWithLabel";
import ColoredBtn from "@components/ColoredBtn";
import Textarea from "@components/Textarea";
import Select from "@components/Select";

import useRequest from "@hooks/useRequest.ts";
import {feedbackSchema} from "@schemata/qnaSchema.ts";
import {feedbackCategories} from "@constants/feedbackCategories.ts";

import {Container} from "./style.ts";
import ConfirmContent from "@components/ConfirmContent";

const UpdateFeedbackPage:FC = () => {
    const [feedback, setFeedback] = useState<any>();
    const [updateFeedbackModal, setUpdateFeedbackModal] = useState<boolean>(false);

    const navigate = useNavigate();

    const {feedbackId} = useParams();

    const {isLoading, errorText, sendRequest, clearError} = useRequest();

    const fetchFeedback = useCallback(async () => {
        try {
            const response = await sendRequest({
                url: `/feedback/${feedbackId}`
            });
            setFeedback(response.data);
        } catch (err) {
            console.error("피드백 조회 중 에러 발생: ", err);
        }
    }, [sendRequest, feedbackId]);

    useEffect(() => {
        fetchFeedback();
    }, [fetchFeedback]);

    type FeedbackFormData = z.infer<typeof feedbackSchema>;

    const {register, handleSubmit, formState:{errors}, reset} = useForm<FeedbackFormData>({
        resolver: zodResolver(feedbackSchema),
        defaultValues: {
            title: "",
            category: "good",
            content:"",
        },
    });

    useEffect(() => {
        if (feedback) {
            reset(feedback);
        }
    }, [feedback, reset]);

    const submitHandler:SubmitHandler<FeedbackFormData> = async (data) => {
        setFeedback(data);
        setUpdateFeedbackModal(true);
    };

    const handleConfirmUpdate = async () => {
        if (feedback) {
            try {
                await sendRequest({
                    url: `/feedback/${feedbackId}`,
                    method: "patch",
                    data: feedback,
                });
                navigate(`/communication/feedback/${feedbackId}`, {replace: true});
            } catch (err) {
                setUpdateFeedbackModal(false);
                console.error("피드백 수정 에러: ", err);
            }
        }
    }

    const UpdateFeedbackModalContent = () => {
        const leftBtn = (
            <ColoredBtn
                type={"button"}
                content={"닫기"}
                width={"full"}
                color={"third"}
                scale={"normal"}
                onClick={() => setUpdateFeedbackModal(false)}
            />
        );
        const rightBtn = (
            <ColoredBtn
                type={"submit"}
                content={"수정하기"}
                width={"full"}
                color={"approval"}
                scale={"normal"}
                onClick={handleConfirmUpdate}
            />
        );
        return (
            <ConfirmContent
                text={"피드백을 수정하시겠습니까?"}
                leftBtn={leftBtn}
                rightBtn={rightBtn}
            />
        );
    };

    return (
        <Container>
            <Header leftChild={<ArrowBack/>} centerText={"피드백 수정"}/>
            {isLoading ?
                <LoadingLoop/>
                :
                <>
                    <form onSubmit={handleSubmit(submitHandler)}>
                        <InputWithLabel
                            label={"제 목"}
                            type={"text"}
                            placeholder={"제목을 입력해주세요"}
                            id={"feedback-title"}
                            name={"title"}
                            register={register}
                            errorMessage={errors.title?.message}
                        />

                        <Select
                            categories={feedbackCategories}
                            name={"category"}
                            register={register}
                            errorMessage={errors.category?.message}
                        />

                        <Textarea
                            register={register}
                            name={"content"}
                            errorMessage={errors.content?.message}
                        />

                        <ColoredBtn type={"submit"} content={"피드백 수정하기"} width={"full"} color={"primary"} scale={"big"}/>
                    </form>

                    {updateFeedbackModal &&
                        <Modal
                          content={<UpdateFeedbackModalContent/>}
                          setModal={setUpdateFeedbackModal}
                          type={"popup"}
                        />
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

export default UpdateFeedbackPage;