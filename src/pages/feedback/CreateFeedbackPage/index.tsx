import {ChangeEvent, FC, useEffect} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";

import {Header} from "@components/common/Header";
import ArrowBack from "@components/common/ArrowBack";
import Select from "@components/common/Select";
import Textarea from "@components/common/Textarea";
import Button from "@components/common/Button";
import Input from "@components/common/Input";
import LoadingLoop from "@components/common/LoadingLoop";
import HeadTag from "@components/common/HeadTag";

import useRequest from "@hooks/useRequest.ts";
import useTextarea from "@hooks/useTextarea.ts";
import BoardSchemaProvider from "@schemata/BoardSchemaProvider.ts";
import {useToastStore} from "@store/useToastStore.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {feedbackCategories} from "@constants/feedbackCategories.ts";
import {placeholderCategories} from "@constants/placeholderCategories.ts";
import {inputCategories} from "@constants/inputCategories.ts";
import {pageDescriptionCategories} from "@constants/pageDescriptionCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {headerCategories} from "@constants/headerCategories.ts";

import {Container} from "./style.ts";


const CreateFeedbackPage:FC = () => {
    const navigate = useNavigate();

    const {lang} = useThemeStore();
    const {showToast} = useToastStore();
    const {text, handleTextChange, countOfText} = useTextarea();
    const {isLoading, errorText, sendRequest, clearError} = useRequest();
    const {feedbackSchema} = BoardSchemaProvider();

    const feedbackInfoCategories = [
        {label: feedbackCategories.good[lang], value: "good", id: "radio-1"},
        {label: feedbackCategories.bad[lang], value: "bad", id: "radio-2"},
        {label: feedbackCategories.suggest[lang], value: "suggest", id: "radio-3"},
        {label: feedbackCategories.etc[lang], value: "etc", id: "radio-4"},
    ];

    type FeedbackFormData = z.infer<typeof feedbackSchema>;

    const {register, handleSubmit, formState:{errors}, setValue} = useForm<FeedbackFormData>({
        resolver: zodResolver(feedbackSchema),
        defaultValues: {
            title: "",
            category: "good",
            content: "",
        },
    });

    // 에러 메시지
    useEffect(() => {
        if (errorText) showToast(errorText, "error");
        const errorTimer = setTimeout(() => clearError(), 6000);
        return () => clearTimeout(errorTimer);
    }, [errorText]);

    // 피드백 생성 요청
    const submitHandler:SubmitHandler<FeedbackFormData> = async (data) => {
        try {
            const response = await sendRequest({
                url: "/feedback/new",
                method: "post",
                data: data,
            });
            const {feedbackId} = response.data;
            navigate(`/board/feedback/${feedbackId}`, { replace: true });
        } catch (err) {
            console.error("피드백 생성 시 에러 발생: ", err);
        }
    };

    // 피드백 content 작성 시, 호출
    const changeTextareaHandler = (e: ChangeEvent<HTMLTextAreaElement>)=> {
        handleTextChange(e);
        setValue("content", e.target.value);
    };

    return (
        <Container>
            <HeadTag title={headerCategories.feedback[lang]}/>

            <Header leftChild={<ArrowBack/>} centerText={headerCategories.feedback[lang]}/>

            {isLoading ?
                <LoadingLoop/>
                :
                <>
                    <p>{pageDescriptionCategories.createFeedback[lang]}</p>

                    <form onSubmit={handleSubmit(submitHandler)}>
                        <Input
                            label={inputCategories.title[lang]}
                            type={"text"}
                            id={"inquiry-title"}
                            name={"title"}
                            placeholder={placeholderCategories.title[lang]}
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
                            text={text}
                            countOfText={countOfText}
                            changeTextareaHandler={changeTextareaHandler}
                        />

                        <Button type={"submit"} content={buttonCategories.sendFeedback[lang]} width={"full"} color={"primary"} scale={"big"}/>
                    </form>
                </>
            }
        </Container>
    );
};

export default CreateFeedbackPage;