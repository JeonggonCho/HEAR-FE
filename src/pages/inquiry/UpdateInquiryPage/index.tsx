import {ChangeEvent, FC, useCallback, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";

import Header from "@components/common/Header";
import ArrowBack from "@components/common/ArrowBack";
import Select from "@components/common/Select";
import LoadingLoop from "@components/common/LoadingLoop";
import Modal from "@components/common/Modal";
import Toast from "@components/common/Toast";
import Textarea from "@components/common/Textarea";
import Button from "@components/common/Button";
import Input from "@components/common/Input";
import ConfirmContent from "@components/content/ConfirmContent";
import HeadTag from "@components/common/HeadTag";

import useRequest from "@hooks/useRequest.ts";
import useTextarea from "@hooks/useTextarea.ts";
import BoardSchemaProvider from "@schemata/BoardSchemaProvider.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {inquiryCategories} from "@constants/inquiryCategories.ts";
import {placeholderCategories} from "@constants/placeholderCategories.ts";
import {inputCategories} from "@constants/inputCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {headerCategories} from "@constants/headerCategories.ts";

import {Container} from "./style.ts";

const UpdateInquiryPage:FC = () => {
    const [inquiry, setInquiry] = useState<any>();
    const [updateInquiryModal, setUpdateInquiryModal] = useState<boolean>(false);

    const navigate = useNavigate();

    const {inquiryId} = useParams();

    const {isLoading, errorText, sendRequest, clearError} = useRequest();
    const {text, setText, handleTextChange, countOfText, setCountOfText} = useTextarea();
    const {lang} = useThemeStore();
    const {inquirySchema} = BoardSchemaProvider();

    const inquiryInfoCategories = [
        {label: inquiryCategories.machine[lang], value: "machine", id: "radio-1"},
        {label: inquiryCategories.reservation[lang], value: "reservation", id: "radio-2"},
        {label: inquiryCategories.room[lang], value: "room", id: "radio-3"},
        {label: inquiryCategories.etc[lang], value: "etc", id: "radio-4"},
    ];

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

    type InquiryFormData = z.infer<typeof inquirySchema>;

    const {register, handleSubmit, formState:{errors}, reset, setValue} = useForm<InquiryFormData>({
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
            setText(inquiry.content);
            setCountOfText(inquiry.content.length);
        }
    }, [inquiry, reset]);

    // 요청 모달 띄우기
    const submitHandler:SubmitHandler<InquiryFormData> = async (data) => {
        setInquiry(data);
        setUpdateInquiryModal(true);
    };

    // 문의 수정 요청하기
    const handleConfirmUpdate = async () => {
        if (inquiry) {
            try {
                await sendRequest({
                    url: `/inquiries/${inquiryId}`,
                    method: "patch",
                    data: inquiry,
                });
                navigate(`/board/inquiry/${inquiryId}`, {replace: true});
            } catch (err) {
                setUpdateInquiryModal(false);
                console.error("문의 수정 에러: ", err);
            }
        }
    };

    // 문의 content 작성 시, 호출
    const changeTextareaHandler = (e: ChangeEvent<HTMLTextAreaElement>)=> {
        handleTextChange(e);
        setValue("content", e.target.value);
    };

    const UpdateInquiryModalContent = () => {
        const leftBtn = (
            <Button
                type={"button"}
                content={buttonCategories.close[lang]}
                width={"full"}
                color={"third"}
                scale={"normal"}
                onClick={() => setUpdateInquiryModal(false)}
            />
        );
        const rightBtn = (
            <Button
                type={"submit"}
                content={buttonCategories.edit[lang]}
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
            <HeadTag title={headerCategories.editInquiry[lang]}/>

            <Header leftChild={<ArrowBack/>} centerText={headerCategories.editInquiry[lang]}/>
            {isLoading ?
                <LoadingLoop/>
                :
                <>
                    <form onSubmit={handleSubmit(submitHandler)}>
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
                            countOfText={countOfText}
                            changeTextareaHandler={changeTextareaHandler}
                            text={text}
                        />

                        <Button type={"submit"} content={buttonCategories.editing[lang]} width={"full"} color={"primary"} scale={"big"}/>
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
                <Toast text={errorText} setToast={clearError} type={"error"}/>
            }
        </Container>
    );
};

export default UpdateInquiryPage;