import {FC, useCallback, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {SubmitHandler, useForm} from "react-hook-form";

import Header from "@components/Header";
import ArrowBack from "@components/ArrowBack";
import InputWithLabel from "@components/InputWithLabel";
import LoadingLoop from "@components/LoadingLoop";
import Modal from "@components/Modal";
import ErrorContent from "@components/ErrorContent";
import Textarea from "@components/Textarea";
import Button from "@components/Button";

import useRequest from "@hooks/useRequest.ts";
import {noticeSchema} from "@schemata/qnaSchema.ts";

import {Container} from "./style.ts";

const UpdateNoticePage:FC = () => {
    const [notice, setNotice] = useState<{title: string, content: string}>();

    const navigate = useNavigate();

    const {noticeId} = useParams();

    const {isLoading, errorText, sendRequest, clearError} = useRequest();

    const fetchNotice = useCallback(async () => {
        try {
            const response = await sendRequest({
                url: `/notices/${noticeId}`,
            });
            const {title, content} = response.data;
            setNotice({title, content});
        } catch (err) {
            console.error("공지 조회 중 에러 발생: ", err);
        }
    }, [sendRequest, noticeId]);

    useEffect(() => {
        fetchNotice();
    }, [fetchNotice]);

    type NoticeFormData = z.infer<typeof noticeSchema>;

    const {register, handleSubmit, formState: {errors}, reset} = useForm<NoticeFormData>({
        resolver: zodResolver(noticeSchema),
        defaultValues: {
            title: "",
            content: "",
        },
    });

    useEffect(() => {
        if (notice) {
            reset(notice);
        }
    }, [notice, reset]);

    const submitHandler:SubmitHandler<NoticeFormData> = async (data) => {
        try {
            await sendRequest({
                url: `/notices/${noticeId}`,
                method: "patch",
                data: data,
            });
            navigate(`/communication/notice/${noticeId}`, {replace: true});
        } catch (err) {
            console.log("공지 수정 중 에러 발생: ", err);
        }
    };

    return (
        <Container>
            <Header leftChild={<ArrowBack/>} centerText={"공지사항 수정"}/>
            {isLoading ?
                <LoadingLoop/>
                :
                <>
                    <form onSubmit={handleSubmit(submitHandler)}>
                        <InputWithLabel
                            label={"제목"}
                            type={"text"}
                            id={"notice-title"}
                            name={"title"}
                            placeholder={"공지사항 제목을 입력해주세요"}
                            register={register}
                            errorMessage={errors.title?.message}
                        />

                        <Textarea
                            register={register}
                            name={"content"}
                            errorMessage={errors.content?.message}
                        />

                        <Button type={"submit"} content={"공지 수정하기"} width={"full"} color={"primary"} scale={"big"}/>
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

export default UpdateNoticePage;