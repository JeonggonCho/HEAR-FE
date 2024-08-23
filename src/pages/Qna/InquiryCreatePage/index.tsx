import Header from "@components/Header";
import ArrowBack from "@components/ArrowBack";
import {Container} from "./style.ts";
import ColoredBtn from "@components/ColoredBtn";
import Textarea from "@components/Textarea";
import Select from "@components/Select";
import InputWithLabel from "@components/InputWithLabel";
import {inquiryCategories} from "@constants/inquiryCategories.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {noticeQnaSchema} from "@schemata/noticeQnaSchema.ts";

const InquiryCreatePage = () => {
    const {register, handleSubmit, formState:{errors}} = useForm({
        resolver: zodResolver(noticeQnaSchema),
        defaultValues: {
            title: "",
            category: "machine",
            content: "",
        }
    })

    return (
        <Container>
            <Header leftChild={<ArrowBack/>} centerText={"문의하기"}/>
            <p>
                모형제작실과 관련된 문제점, 궁금한 점 등<br/>
                문의사항을 보내주세요
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

                <ColoredBtn type={"submit"} content={"문의하기"} width={"full"} color={"primary"} scale={"big"}/>
            </form>
        </Container>
    );
};

export default InquiryCreatePage;