import {createContext, useCallback, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import Input from "@components/common/Input";
import Textarea from "@components/common/Textarea";
import Flex from "@components/common/Flex";
import UpdateInquiry from "@components/inquiry/UpdateInquiry";
import Select from "@components/common/Select";
import BoardSchemaProvider from "@schemata/BoardSchemaProvider.ts";
import useRequest from "@hooks/useRequest.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {inputCategories} from "@constants/inputCategories.ts";
import {placeholderCategories} from "@constants/placeholderCategories.ts";
import {inquiryCategories} from "@constants/inquiryCategories.ts";


const UpdateInquiryFormContext = createContext<{formData: any; isValid: boolean; inquiryId: string | undefined;}>({
    formData: null,
    isValid: false,
    inquiryId: undefined,
});


const UpdateInquiryForm = () => {
    const [inquiry, setInquiry] = useState<{title: string, category: "machine" | "reservation" | "room" | "etc" , content: string}>();

    const {lang} = useThemeStore();
    const {inquiryId} = useParams();
    const {inquirySchema} = BoardSchemaProvider();
    const {sendRequest} = useRequest();

    const inquiryInfoCategories = [
        {label: inquiryCategories.machine[lang], value: "machine", id: "radio-1"},
        {label: inquiryCategories.reservation[lang], value: "reservation", id: "radio-2"},
        {label: inquiryCategories.room[lang], value: "room", id: "radio-3"},
        {label: inquiryCategories.etc[lang], value: "etc", id: "radio-4"},
    ];

    type InquiryFormData = z.infer<typeof inquirySchema>;

    const {
        register,
        handleSubmit,
        formState: {errors, isValid},
        reset,
        watch,
    } = useForm<InquiryFormData>({
        resolver: zodResolver(inquirySchema),
        defaultValues: {
            title: "",
            category: "machine",
            content: "",
        },
        mode: "onChange",
    });

    const fetchInquiry = useCallback(async () => {
        try {
            const response = await sendRequest({
                url: `/inquiries/${inquiryId}`,
            });
            setInquiry(response.data.inquiry);
        } catch (err) {
            console.error("문의 조회 중 에러 발생: ", err);
        }
    }, [sendRequest, inquiryId]);

    useEffect(() => {
        fetchInquiry();
    }, [fetchInquiry]);

    useEffect(() => {
        if (inquiry) {
            reset(inquiry);
        }
    }, [inquiry, reset]);

    const submitHandler:SubmitHandler<InquiryFormData> = async (data) => {
        setInquiry(data);
    };

    const countOfTextarea = watch("content").length;

    return (
        <UpdateInquiryFormContext.Provider value={{formData: inquiry, isValid, inquiryId}}>
            <form onSubmit={handleSubmit(submitHandler)}>
                <Flex direction={"column"} gap={14} style={{margin: "0 24px"}}>
                    <Input
                        label={inputCategories.title[lang]}
                        type={"text"}
                        placeholder={placeholderCategories.title[lang]}
                        id={"inquiry-title"}
                        name={"title"}
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
                        countOfTextarea={countOfTextarea}
                    />
                    <UpdateInquiry/>
                </Flex>
            </form>
        </UpdateInquiryFormContext.Provider>
    );
};

export {UpdateInquiryForm, UpdateInquiryFormContext};