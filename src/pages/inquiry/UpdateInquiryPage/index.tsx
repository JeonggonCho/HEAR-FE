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
import Textarea from "@components/Textarea";
import ColoredBtn from "@components/ColoredBtn";
import InputWithLabel from "@components/InputWithLabel";
import Select from "@components/Select";

import useRequest from "@hooks/useRequest.ts";
import {inquirySchema} from "@schemata/qnaSchema.ts";
import {inquiryCategories} from "@constants/inquiryCategories.ts";

import {Container} from "./style.ts";

const UpdateInquiryPage:FC = () => {
    const [inquiry, setInquiry] = useState();

    const navigate = useNavigate();

    const {inquiryId} = useParams();

    const {isLoading, errorText, sendRequest, clearError} = useRequest();

    const fetchInquiry = useCallback(async () => {
        try {
            const response = await sendRequest({
                url: `/inquiries/${inquiryId}`,
            });
            setInquiry(response.data);
        } catch (err) {
            console.error("문의 조회 중 에러 발생: ", err);
        }
    }, [sendRequest, inquiryId]);

    useEffect(() => {
        fetchInquiry();
    }, [fetchInquiry]);

    type InquiryFormData = z.infer<typeof inquirySchema>;

    const {register, handleSubmit, formState:{errors}, reset} = useForm<InquiryFormData>({
        resolver: zodResolver(inquirySchema),
        defaultValues: {
            title: "",
            category: "machine",
            content: "",
        },
    });

    useEffect(() => {
        if (inquiry) {
            reset(inquiry);
        }
    }, [inquiry, reset]);

    const submitHandler:SubmitHandler<InquiryFormData> = async (data) => {
        try {
            await sendRequest({
                url: `/inquiries/${inquiryId}`,
                method: "patch",
                data: data,
            });
            navigate(`/communication/inquiry/${inquiryId}`, {replace: true});
        } catch (err) {
            console.error("문의 수정 중 에러 발생: ", err);
        }
    };

    return (
        <Container>
            <Header leftChild={<ArrowBack/>} centerText={"문의 수정"}/>
            {isLoading ?
                <LoadingLoop/>
                :
                <>
                    <form onSubmit={handleSubmit(submitHandler)}>
                        <InputWithLabel
                            label={"제 목"}
                            type={"text"}
                            placeholder={"제목을 입력해주세요"}
                            id={"inquiry-title"}
                            name={"title"}
                            register={register}
                            errorMessage={errors.title?.message}
                        />

                        <Select
                            categories={inquiryCategories}
                            name={"category"}
                            register={register}
                            errorMessage={errors.category?.message}
                        />

                        <Textarea
                            register={register}
                            name={"content"}
                            errorMessage={errors.content?.message}
                        />

                        <ColoredBtn type={"submit"} content={"문의 수정하기"} width={"full"} color={"primary"} scale={"big"}/>
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

export default UpdateInquiryPage;