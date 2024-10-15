import {FC} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {z} from "zod";
import {useNavigate} from "react-router-dom";
import {zodResolver} from "@hookform/resolvers/zod";

import Header from "@components/common/Header";
import ArrowBack from "@components/common/ArrowBack";
import Button from "@components/common/Button";
import Textarea from "@components/common/Textarea";
import Select from "@components/common/Select";
import Input from "@components/common/Input";
import LoadingLoop from "@components/common/LoadingLoop";
import Toast from "@components/common/Toast";
import HeadTag from "@components/common/HeadTag";

import {inquirySchema} from "@schemata/qnaSchema.ts";
import useRequest from "@hooks/useRequest.ts";
import {inquiryCategories} from "@constants/inquiryCategories.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {placeholderCategories} from "@constants/placeholderCategories.ts";
import {inputCategories} from "@constants/inputCategories.ts";
import {pageDescriptionCategories} from "@constants/pageDescriptionCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {headerCategories} from "@constants/headerCategories.ts";

import {Container} from "./style.ts";

const CreateInquiryPage:FC = () => {
    const navigate = useNavigate();

    const {lang} = useThemeStore();

    const inquiryInfoCategories = [
        {label: inquiryCategories.machine[lang], value: "machine", id: "radio-1"},
        {label: inquiryCategories.reservation[lang], value: "reservation", id: "radio-2"},
        {label: inquiryCategories.room[lang], value: "room", id: "radio-3"},
        {label: inquiryCategories.etc[lang], value: "etc", id: "radio-4"},
    ];

    const {isLoading, errorText, sendRequest, clearError} = useRequest();

    type InquiryFormData = z.infer<typeof inquirySchema>;

    const {register, handleSubmit, formState:{errors}} = useForm<InquiryFormData>({
        resolver: zodResolver(inquirySchema),
        defaultValues: {
            title: "",
            category: "machine",
            content: "",
        }
    })

    const submitHandler: SubmitHandler<InquiryFormData> = async (data) => {
        try {
            const response = await sendRequest({
                url: "/inquiries/new",
                method: "post",
                data: data,
            });
            const {inquiryId} = response.data;
            navigate(`/board/inquiry/${inquiryId}`, { replace: true });
        } catch (err) {
            console.error("문의 생성 시 에러 발생: ", err);
        }
    };

    return (
        <Container>
            <HeadTag title={headerCategories.inquiry[lang]}/>

            <Header leftChild={<ArrowBack/>} centerText={headerCategories.inquiry[lang]}/>
            {isLoading ?
                <LoadingLoop/>
                :
                <>
                    <p>{pageDescriptionCategories.createInquiry[lang]}</p>

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
                        />

                        <Button type={"submit"} content={buttonCategories.sendInquiry[lang]} width={"full"} color={"primary"} scale={"big"}/>
                    </form>
                </>
            }

            {errorText &&
                <Toast text={errorText} setToast={clearError} type={"error"}/>
            }
        </Container>
    );
};

export default CreateInquiryPage;