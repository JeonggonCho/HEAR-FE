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
import Modal from "@components/common/Modal";
import ErrorContent from "@components/content/ErrorContent";

import {inquiryCategories} from "@constants/inquiryCategories.ts";
import {inquirySchema} from "@schemata/qnaSchema.ts";
import useRequest from "@hooks/useRequest.ts";

import {Container} from "./style.ts";

const CreateInquiryPage:FC = () => {
    const navigate = useNavigate();

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
            navigate(`/communication/inquiry/${inquiryId}`, { replace: true });
        } catch (err) {
            console.error("문의 생성 시 에러 발생: ", err);
        }
    };

    return (
        <Container>
            <Header leftChild={<ArrowBack/>} centerText={"문의하기"}/>
            {isLoading ?
                <LoadingLoop/>
                :
                <>
                    <p>
                        모형제작실과 관련된 문제점, 궁금한 점 등<br/>
                        문의사항을 보내주세요
                    </p>

                    <form onSubmit={handleSubmit(submitHandler)}>
                        <Input
                            label={"제 목"}
                            type={"text"}
                            id={"inquiry-title"}
                            name={"title"}
                            placeholder={"제목을 입력해주세요"}
                            register={register}
                            errorMessage={errors.title?.message}
                        />

                        <Select
                            categories={inquiryCategories}
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

                        <Button type={"submit"} content={"문의하기"} width={"full"} color={"primary"} scale={"big"}/>
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

export default CreateInquiryPage;