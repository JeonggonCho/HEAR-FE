import {FC} from "react";
import {useNavigate} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";

import Header from "@components/common/Header";
import ArrowBack from "@components/common/ArrowBack";
import Input from "@components/common/Input";
import Textarea from "@components/common/Textarea";
import Button from "@components/common/Button";
import LoadingLoop from "@components/common/LoadingLoop";
import Toast from "@components/common/Toast";
import HeadTag from "@components/common/HeadTag";

import {noticeSchema} from "@schemata/qnaSchema.ts";
import useRequest from "@hooks/useRequest.ts";
import {inputCategories} from "@constants/inputCategories.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {placeholderCategories} from "@constants/placeholderCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {headerCategories} from "@constants/headerCategories.ts";

import {Container} from "./style.ts";

const CreateNoticePage:FC = () => {
    const navigate = useNavigate();

    const {lang} = useThemeStore();

    const {isLoading, errorText, sendRequest, clearError} = useRequest();

    type NoticeFormData = z.infer<typeof noticeSchema>;

    const {register, handleSubmit, formState: {errors}} = useForm<NoticeFormData>({
        resolver: zodResolver(noticeSchema),
        defaultValues: {
            title: "",
            content: "",
        },
    });

    const submitHandler:SubmitHandler<NoticeFormData> = async (data) => {
        try {
            const response = await sendRequest({
                url: "/notices/new",
                method: "post",
                data: data,
            });
            const {noticeId} = response.data;
            navigate(`/board/notice/${noticeId}`, { replace: true });
        } catch (err) {
            console.error("공지 등록 중 에러 발생: ", err);
        }
    };

    return (
        <Container>
            <HeadTag title={headerCategories.createNotice[lang]}/>

            <Header leftChild={<ArrowBack/>} centerText={headerCategories.createNotice[lang]}/>
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
                        />

                        <Button type={"submit"} content={buttonCategories.createNotice[lang]} width={"full"} color={"primary"} scale={"big"}/>
                    </form>
                </>
            }

            {errorText &&
                <Toast text={errorText} setToast={clearError} type={"error"}/>
            }
        </Container>
    );
};

export default CreateNoticePage;