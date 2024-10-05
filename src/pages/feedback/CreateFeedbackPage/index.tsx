import {FC} from "react";
import {z} from "zod";
import {SubmitHandler, useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {zodResolver} from "@hookform/resolvers/zod";

import Header from "@components/common/Header";
import ArrowBack from "@components/common/ArrowBack";
import Textarea from "@components/common/Textarea";
import Button from "@components/common/Button";
import Select from "@components/common/Select";
import Input from "@components/common/Input";
import LoadingLoop from "@components/common/LoadingLoop";
import Modal from "@components/common/Modal";
import ErrorContent from "@components/content/ErrorContent";

import {feedbackSchema} from "@schemata/qnaSchema.ts";
import useRequest from "@hooks/useRequest.ts";
import {
    buttonLabels,
    feedbackType,
    headerTitle,
    inputLabels,
    pageIntroduction,
    placeholders
} from "@constants/langCategories.ts";
import {useThemeStore} from "@store/useThemeStore.ts";

import {Container} from "./style.ts";

const CreateFeedbackPage:FC = () => {
    const navigate = useNavigate();

    const {lang} = useThemeStore();

    const feedbackCategories = [
        {label: feedbackType.good[lang], value: "good", id: "radio-1"},
        {label: feedbackType.bad[lang], value: "bad", id: "radio-2"},
        {label: feedbackType.suggest[lang], value: "suggest", id: "radio-3"},
        {label: feedbackType.etc[lang], value: "etc", id: "radio-4"},
    ];

    const {isLoading, errorText, sendRequest, clearError} = useRequest();

    type FeedbackFormData = z.infer<typeof feedbackSchema>;

    const {register, handleSubmit, formState:{errors}} = useForm<FeedbackFormData>({
        resolver: zodResolver(feedbackSchema),
        defaultValues: {
            title: "",
            category: "good",
            content: "",
        },
    });

    const submitHandler:SubmitHandler<FeedbackFormData> = async (data) => {
        try {
            const response = await sendRequest({
                url: "/feedback/new",
                method: "post",
                data: data,
            });
            const {feedbackId} = response.data;
            navigate(`/communication/feedback/${feedbackId}`, { replace: true });
        } catch (err) {
            console.error("피드백 생성 시 에러 발생: ", err);
        }
    };

    return (
        <Container>
            <Header leftChild={<ArrowBack/>} centerText={headerTitle.feedback[lang]}/>
            {isLoading ?
                <LoadingLoop/>
                :
                <>
                    <p>{pageIntroduction.createFeedback[lang]}</p>

                    <form onSubmit={handleSubmit(submitHandler)}>
                        <Input
                            label={inputLabels.title[lang]}
                            type={"text"}
                            id={"inquiry-title"}
                            name={"title"}
                            placeholder={placeholders.title[lang]}
                            register={register}
                            errorMessage={errors.title?.message}
                        />

                        <Select
                            categories={feedbackCategories}
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

                        <Button type={"submit"} content={buttonLabels.sendFeedback[lang]} width={"full"} color={"primary"} scale={"big"}/>
                    </form>
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

export default CreateFeedbackPage;