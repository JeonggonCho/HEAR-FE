import {ChangeEvent, createContext, useCallback, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import Input from "@components/common/Input";
import Textarea from "@components/common/Textarea";
import Flex from "@components/common/Flex";
import UpdateFeedback from "@components/feedback/UpdateFeedback";
import BoardSchemaProvider from "@schemata/BoardSchemaProvider.ts";
import useTextarea from "@hooks/useTextarea.ts";
import useRequest from "@hooks/useRequest.ts";
import Select from "@components/common/Select";
import {useThemeStore} from "@store/useThemeStore.ts";
import {inputCategories} from "@constants/inputCategories.ts";
import {placeholderCategories} from "@constants/placeholderCategories.ts";
import {feedbackCategories} from "@constants/feedbackCategories.ts";
import fetchFeedbackApi from "@api/feedback/fetchFeedbackApi.ts";


const UpdateFeedbackFormContext = createContext<{formData: any; isValid: boolean; feedbackId: string | undefined;}>({
    formData: null,
    isValid: false,
    feedbackId: undefined,
});


const UpdateFeedbackForm = () => {
    const [feedback, setFeedback] = useState<{title: string, category: "good" | "bad" | "suggest" | "etc" , content: string}>();

    const {feedbackId} = useParams();
    const {lang} = useThemeStore();
    const {text, handleTextChange, countOfText, setCountOfText, setText} = useTextarea();
    const {sendRequest} = useRequest();
    const {feedbackSchema} = BoardSchemaProvider();

    const feedbackInfoCategories = [
        {label: feedbackCategories.good[lang], value: "good", id: "radio-1"},
        {label: feedbackCategories.bad[lang], value: "bad", id: "radio-2"},
        {label: feedbackCategories.suggest[lang], value: "suggest", id: "radio-3"},
        {label: feedbackCategories.etc[lang], value: "etc", id: "radio-4"},
    ];

    type FeedbackFormData = z.infer<typeof feedbackSchema>;

    const {register, handleSubmit, formState:{errors, isValid}, reset, setValue} = useForm<FeedbackFormData>({
        resolver: zodResolver(feedbackSchema),
        defaultValues: {
            title: "",
            category: "good",
            content:"",
        },
    });

    // 현재 작성된 피드백 정보 가져오기
    const fetchFeedback = useCallback(async () => {
        if (!feedbackId) return;
        try {
            const responseData = await fetchFeedbackApi({feedbackId, sendRequest});
            const {title, category, content} = responseData.feedback;
            setFeedback({title, category, content});
        } catch (err) {
            console.error("피드백 조회 중 에러 발생: ", err);
        }
    }, [sendRequest, feedbackId]);

    useEffect(() => {
        fetchFeedback();
    }, [fetchFeedback]);

    useEffect(() => {
        if (feedback) {
            reset(feedback);
            setText(feedback.content);
            setCountOfText(feedback.content.length);
        }
    }, [feedback, reset]);

    const submitHandler:SubmitHandler<FeedbackFormData> = async (data) => {
        setFeedback(data);
    };

    // 피드백 content 작성 시, 호출
    const changeTextareaHandler = (e: ChangeEvent<HTMLTextAreaElement>)=> {
        handleTextChange(e);
        setValue("content", e.target.value);
    };

    return (
        <UpdateFeedbackFormContext.Provider value={{formData: feedback, isValid, feedbackId}}>
            <form onSubmit={handleSubmit(submitHandler)}>
                <Flex direction={"column"} gap={14} style={{width: "100%"}}>
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
                        text={text}
                        countOfText={countOfText}
                        changeTextareaHandler={changeTextareaHandler}
                    />
                    <UpdateFeedback/>
                </Flex>
            </form>
        </UpdateFeedbackFormContext.Provider>
    );
};

export {UpdateFeedbackForm, UpdateFeedbackFormContext};