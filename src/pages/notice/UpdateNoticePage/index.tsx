import {FC, useCallback, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {SubmitHandler, useForm} from "react-hook-form";

import Header from "@components/common/Header";
import ArrowBack from "@components/common/ArrowBack";
import Input from "@components/common/Input";
import LoadingLoop from "@components/common/LoadingLoop";
import Toast from "@components/common/Toast";
import Textarea from "@components/common/Textarea";
import Button from "@components/common/Button";
import HeadTag from "@components/common/HeadTag";

import useRequest from "@hooks/useRequest.ts";
import useTextarea from "@hooks/useTextarea.ts";
import {noticeSchema} from "@schemata/qnaSchema.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {inputCategories} from "@constants/inputCategories.ts";
import {placeholderCategories} from "@constants/placeholderCategories.ts";
import {headerCategories} from "@constants/headerCategories.ts";

import {Container} from "./style.ts";

const UpdateNoticePage:FC = () => {
    const [notice, setNotice] = useState<{title: string, content: string}>();

    const {lang} = useThemeStore();
    const {isLoading, errorText, sendRequest, clearError} = useRequest();
    const {text, handleTextChange, countOfText} = useTextarea();

    const navigate = useNavigate();

    const {noticeId} = useParams();

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
            navigate(`/board/notice/${noticeId}`, {replace: true});
        } catch (err) {
            console.log("공지 수정 중 에러 발생: ", err);
        }
    };

    return (
        <Container>
            <HeadTag title={headerCategories.updateNotice[lang]}/>

            <Header leftChild={<ArrowBack/>} centerText={headerCategories.updateNotice[lang]}/>
            {isLoading ?
                <LoadingLoop/>
                :
                <>
                    <form onSubmit={handleSubmit(submitHandler)}>
                        <Input
                            label={inputCategories.title[lang]}
                            type={"text"}
                            id={"notice-title"}
                            name={"title"}
                            placeholder={placeholderCategories.title[lang]}
                            register={register}
                            errorMessage={errors.title?.message}
                        />

                        <Textarea
                            register={register}
                            name={"content"}
                            errorMessage={errors.content?.message}
                            text={text}
                            handleTextChange={handleTextChange}
                            countOfText={countOfText}
                        />

                        <Button type={"submit"} content={buttonCategories.editing[lang]} width={"full"} color={"primary"} scale={"big"}/>
                    </form>
                </>
            }

            {errorText &&
                <Toast text={errorText} setToast={clearError} type={"error"}/>
            }
        </Container>
    );
};

export default UpdateNoticePage;