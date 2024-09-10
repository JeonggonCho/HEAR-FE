import {useNavigate} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";

import Header from "@components/Header";
import ArrowBack from "@components/ArrowBack";
import InputWithLabel from "@components/InputWithLabel";
import Textarea from "@components/Textarea";
import ColoredBtn from "@components/ColoredBtn";
import LoadingLoop from "@components/LoadingLoop";
import Modal from "@components/Modal";
import ErrorContent from "@components/ErrorContent";

import {noticeSchema} from "@schemata/qnaSchema.ts";
import useRequest from "@hooks/useRequest.ts";

import {Container} from "./style.ts";

const CreateNoticePage = () => {
    const navigate = useNavigate();

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
            navigate(`/notice/${noticeId}`, { replace: true });
        } catch (err) {
            console.error("공지 등록 중 에러 발생: ", err);
        }
    };

    return (
        <Container>
            <Header leftChild={<ArrowBack/>} centerText={"공지사항 작성"}/>
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

                        <ColoredBtn type={"submit"} content={"공지하기"} width={"full"} color={"primary"} scale={"big"}/>
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

export default CreateNoticePage;