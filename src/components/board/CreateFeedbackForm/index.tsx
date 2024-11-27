import {ChangeEvent} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import Input from "@components/common/Input";
import Textarea from "@components/common/Textarea";
import Button from "@components/common/Button";
import Select from "@components/common/Select";
import BoardSchemaProvider from "@schemata/BoardSchemaProvider.ts";
import useTextarea from "@hooks/useTextarea.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {inputCategories} from "@constants/inputCategories.ts";
import {placeholderCategories} from "@constants/placeholderCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {feedbackCategories} from "@constants/feedbackCategories.ts";


const CreateFeedbackForm = () => {
    const {lang} = useThemeStore();
    const {feedbackSchema} = BoardSchemaProvider();
    const {text, handleTextChange, countOfText} = useTextarea();

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

    // 피드백 생성 요청
    // const submitHandler:SubmitHandler<FeedbackFormData> = async (data) => {
    //     try {
    //         const response = await sendRequest({
    //             url: "/feedback/new",
    //             method: "post",
    //             data: data,
    //         });
    //         const {feedbackId} = response.data;
    //         navigate(`/board/feedback/${feedbackId}`, { replace: true });
    //     } catch (err) {
    //         console.error("피드백 생성 시 에러 발생: ", err);
    //     }
    // };

    // 피드백 content 작성 시, 호출
    const changeTextareaHandler = (e: ChangeEvent<HTMLTextAreaElement>)=> {
        handleTextChange(e);
        setValue("content", e.target.value);
    };

    const submitHandler = () => {
        return;
    };

    return (
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
            <Button
                type={"submit"}
                variant={"filled"}
                width={"full"}
                color={"primary"}
                size={"lg"}
            >
                {buttonCategories.sendFeedback[lang]}
            </Button>
        </form>
    );
};

export default CreateFeedbackForm;