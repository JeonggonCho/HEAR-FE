import {ChangeEvent} from "react";
import {useNavigate} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import Input from "@components/common/Input";
import Select from "@components/common/Select";
import Textarea from "@components/common/Textarea";
import Button from "@components/common/Button";
import Flex from "@components/common/Flex";
import BoardSchemaProvider from "@schemata/BoardSchemaProvider.ts";
import createInquiryApi from "@api/inquiry/createInquiryApi.ts";
import useTextarea from "@hooks/useTextarea.ts";
import useRequest from "@hooks/useRequest.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {inputCategories} from "@constants/inputCategories.ts";
import {placeholderCategories} from "@constants/placeholderCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {inquiryCategories} from "@constants/inquiryCategories.ts";


const CreateInquiryForm = () => {
    const navigate = useNavigate();
    const {lang} = useThemeStore();
    const {text, handleTextChange, countOfText} = useTextarea();
    const {inquirySchema} = BoardSchemaProvider();
    const {sendRequest} = useRequest();

    const inquiryInfoCategories = [
        {label: inquiryCategories.machine[lang], value: "machine", id: "radio-1"},
        {label: inquiryCategories.reservation[lang], value: "reservation", id: "radio-2"},
        {label: inquiryCategories.room[lang], value: "room", id: "radio-3"},
        {label: inquiryCategories.etc[lang], value: "etc", id: "radio-4"},
    ];

    type InquiryFormData = z.infer<typeof inquirySchema>;

    const {register, handleSubmit, setValue, formState:{errors, isValid}} = useForm<InquiryFormData>({
        resolver: zodResolver(inquirySchema),
        defaultValues: {
            title: "",
            category: "machine",
            content: "",
        }
    });

    const submitHandler:SubmitHandler<InquiryFormData> = async (data) => {
        try {
            const responseData = await createInquiryApi({data, sendRequest})
            const {inquiryId} = responseData;
            navigate(`/board/inquiry/${inquiryId}`, { replace: true });
        } catch (err) {
            console.error("문의 생성 시 에러 발생: ", err);
        }
    };

    // 문의 content 작성 시, 호출
    const changeTextareaHandler = (e: ChangeEvent<HTMLTextAreaElement>)=> {
        handleTextChange(e);
        setValue("content", e.target.value);
    };

    return (
        <form onSubmit={handleSubmit(submitHandler)}>
            <Flex direction={"column"} gap={14} style={{margin: "0 24px"}}>
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
                    categories={inquiryInfoCategories}
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
                    disabled={!isValid}
                >
                    {buttonCategories.sendInquiry[lang]}
                </Button>
            </Flex>
        </form>
    );
};

export default CreateInquiryForm;