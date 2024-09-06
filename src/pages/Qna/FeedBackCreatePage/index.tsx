import Header from "@components/Header";
import ArrowBack from "@components/ArrowBack";
import Textarea from "@components/Textarea";
import ColoredBtn from "@components/ColoredBtn";
import {Container} from "./style.ts";
import Select from "@components/Select";
import InputWithLabel from "@components/InputWithLabel";
import {feedbackCategories} from "@constants/feedbackCategories.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {feedbackSchema} from "@schemata/qnaSchema.ts";

const FeedbackCreatePage = () => {
    const {register, handleSubmit, formState:{errors}} = useForm({
        resolver: zodResolver(feedbackSchema),
        defaultValues: {
            title: "",
            category: "good",
            content: "",
        },
    });

    return (
        <Container>
            <Header leftChild={<ArrowBack/>} centerText={"어플리케이션 피드백"}/>
            <p>
                어플리케이션의 좋은점, 개선점 등<br/>
                여러분의 피드백을 보내주세요
            </p>
            
            <form method={"post"} onSubmit={handleSubmit((data) => {
                console.log(data);
            })}>
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
        </Container>
    );
};

export default FeedbackCreatePage;