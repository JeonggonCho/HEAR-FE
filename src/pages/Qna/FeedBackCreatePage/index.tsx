import {z} from "zod";
import Header from "@components/Header";
import ArrowBack from "@components/ArrowBack";
import Textarea from "@components/Textarea";
import ColoredBtn from "@components/ColoredBtn";
import {Container} from "./style.ts";
import Select from "@components/Select";
import InputWithLabel from "@components/InputWithLabel";
import {feedbackCategories} from "@constants/feedbackCategories.ts";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {feedbackSchema} from "@schemata/qnaSchema.ts";
import {useNavigate} from "react-router-dom";
import useRequest from "@hooks/useRequest.ts";
import LoadingLoop from "@components/LoadingLoop";
import Modal from "@components/Modal";

const FeedbackCreatePage = () => {
    const navigate = useNavigate();

    const {isLoading, errorText, sendRequest, clearError} = useRequest();

    type FeedbackFormData = z.infer<typeof feedbackSchema>;

    const {register, handleSubmit, formState:{errors}} = useForm<FeedbackFormData>({
        resolver: zodResolver(feedbackSchema),
        defaultValues: {
            title: "",
            category: "good",
            content: "",
        },
    });

    const submitHandler:SubmitHandler<FeedbackFormData> = async (data) => {
        try {
            const response = await sendRequest({
                url: "/feedback/new",
                method: "post",
                data: data,
            });
            const {feedbackId} = response.data;
            navigate(`/feedback/${feedbackId}`, { replace: true });
        } catch (err) {
            console.error("피드백 생성 시 에러 발생: ", err);
        }
    };

    return (
        <Container>
            <Header leftChild={<ArrowBack/>} centerText={"어플리케이션 피드백"}/>
            {isLoading ?
                <LoadingLoop/>
                :
                <>
                    <p>
                        어플리케이션의 좋은점, 개선점 등<br/>
                        여러분의 피드백을 보내주세요
                    </p>

                    <form onSubmit={handleSubmit(submitHandler)}>
                        <InputWithLabel
                            label={"제 목"}
                            type={"text"}
                            id={"inquiry-title"}
                            name={"title"}
                            placeholder={"제목을 입력해주세요"}
                            register={register}
                            errorMessage={errors.title?.message}
                        />

                        <Select
                            categories={feedbackCategories}
                            name={"category"}
                            register={register}
                            errorMessage={errors.category?.message}
                        />

                        <Textarea
                            register={register}
                            name={"content"}
                            errorMessage={errors.content?.message}
                        />

                        <ColoredBtn type={"submit"} content={"피드백 보내기"} width={"full"} color={"primary"} scale={"big"}/>
                    </form>
                </>
            }

            {errorText &&
              <Modal
                content={<div>{errorText}</div>}
                setModal={clearError}
                type={"popup"}
              />
            }
        </Container>
    );
};

export default FeedbackCreatePage;