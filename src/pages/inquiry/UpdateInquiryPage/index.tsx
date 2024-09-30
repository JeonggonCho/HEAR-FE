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
import Textarea from "@components/common/Textarea";
import Button from "@components/common/Button";
import Input from "@components/common/Input";
import Select from "@components/common/Select";
import ConfirmContent from "@components/content/ConfirmContent";

import useRequest from "@hooks/useRequest.ts";
import {inquirySchema} from "@schemata/qnaSchema.ts";
import {inquiryCategories} from "@constants/inquiryCategories.ts";

import {Container} from "./style.ts";

const UpdateInquiryPage:FC = () => {
    const [inquiry, setInquiry] = useState<any>();
    const [updateInquiryModal, setUpdateInquiryModal] = useState<boolean>(false);

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
        setInquiry(data);
        setUpdateInquiryModal(true);
    };

    const handleConfirmUpdate = async () => {
        if (inquiry) {
            try {
                await sendRequest({
                    url: `/inquiries/${inquiryId}`,
                    method: "patch",
                    data: inquiry,
                });
                navigate(`/communication/inquiry/${inquiryId}`, {replace: true});
            } catch (err) {
                setUpdateInquiryModal(false);
                console.error("문의 수정 에러: ", err);
            }
        }
    };

    const UpdateInquiryModalContent = () => {
        const leftBtn = (
            <Button
                type={"button"}
                content={"닫기"}
                width={"full"}
                color={"third"}
                scale={"normal"}
                onClick={() => setUpdateInquiryModal(false)}
            />
        );
        const rightBtn = (
            <Button
                type={"submit"}
                content={"수정하기"}
                width={"full"}
                color={"approval"}
                scale={"normal"}
                onClick={handleConfirmUpdate}
            />
        );
        return (
            <ConfirmContent
                text={"문의를 수정하시겠습니까?"}
                leftBtn={leftBtn}
                rightBtn={rightBtn}
            />
        );
    };

    return (
        <Container>
            <Header leftChild={<ArrowBack/>} centerText={"문의 수정"}/>
            {isLoading ?
                <LoadingLoop/>
                :
                <>
                    <form onSubmit={handleSubmit(submitHandler)}>
                        <Input
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
                            type={"radio"}
                        />

                        <Textarea
                            register={register}
                            name={"content"}
                            errorMessage={errors.content?.message}
                        />

                        <Button type={"submit"} content={"문의 수정하기"} width={"full"} color={"primary"} scale={"big"}/>
                    </form>

                    {updateInquiryModal &&
                        <Modal
                          content={<UpdateInquiryModalContent/>}
                          setModal={setUpdateInquiryModal}
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

export default UpdateInquiryPage;