import {FC, useCallback, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {z} from "zod";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import Header from "@components/common/Header";
import ArrowBack from "@components/common/ArrowBack";
import LoadingLoop from "@components/common/LoadingLoop";
import Modal from "@components/common/Modal";
import ErrorContent from "@components/content/ErrorContent";
import Input from "@components/common/Input";
import Button from "@components/common/Button";
import Textarea from "@components/common/Textarea";
import Select from "@components/common/Select";
import ConfirmContent from "@components/content/ConfirmContent";

import useRequest from "@hooks/useRequest.ts";
import {feedbackSchema} from "@schemata/qnaSchema.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {feedbackCategories} from "@constants/feedbackCategories.ts";
import {placeholderCategories} from "@constants/placeholderCategories.ts";
import {inputCategories} from "@constants/inputCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {headerCategories} from "@constants/headerCategories.ts";

import {Container} from "./style.ts";

const UpdateFeedbackPage:FC = () => {
    const [feedback, setFeedback] = useState<any>();
    const [updateFeedbackModal, setUpdateFeedbackModal] = useState<boolean>(false);

    const {lang} = useThemeStore();

    const feedbackInfoCategories = [
        {label: feedbackCategories.good[lang], value: "good", id: "radio-1"},
        {label: feedbackCategories.bad[lang], value: "bad", id: "radio-2"},
        {label: feedbackCategories.suggest[lang], value: "suggest", id: "radio-3"},
        {label: feedbackCategories.etc[lang], value: "etc", id: "radio-4"},
    ];

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
            <Button
                type={"button"}
                content={buttonCategories.close[lang]}
                width={"full"}
                color={"third"}
                scale={"normal"}
                onClick={() => setUpdateFeedbackModal(false)}
            />
        );
        const rightBtn = (
            <Button
                type={"submit"}
                content={buttonCategories.edit[lang]}
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
            <Header leftChild={<ArrowBack/>} centerText={headerCategories.editFeedback[lang]}/>
            {isLoading ?
                <LoadingLoop/>
                :
                <>
                    <form onSubmit={handleSubmit(submitHandler)}>
                        <Input
                            label={inputCategories.title[lang]}
                            type={"text"}
                            placeholder={placeholderCategories.title[lang]}
                            id={"feedback-title"}
                            name={"title"}
                            register={register}
                            errorMessage={errors.title?.message}
                        />

                        <Select
                            categories={feedbackInfoCategories}
                            name={"category"}
                            register={register}
                            errorMessage={errors.category?.message}
                            type={"radio"}
                        />

                        <Textarea
                            register={register}
                            name={"content"}
                            errorMessage={errors.content?.message}
                        />

                        <Button type={"submit"} content={buttonCategories.edit[lang]} width={"full"} color={"primary"} scale={"big"}/>
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