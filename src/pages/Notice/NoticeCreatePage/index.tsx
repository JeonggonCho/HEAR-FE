import {Container} from "./style.ts";
import Header from "@components/Header";
import ArrowBack from "@components/ArrowBack";
import InputWithLabel from "@components/InputWithLabel";
import Textarea from "@components/Textarea";
import ColoredBtn from "@components/ColoredBtn";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {noticeQnaSchema} from "@schemata/noticeQnaSchema.ts";

const NoticeCreatePage = () => {
    const {register, handleSubmit, formState:{errors}} = useForm({
        resolver: zodResolver(noticeQnaSchema),
        defaultValues: {
            title: "",
            content: "",
        },
    });

    return (
        <Container>
            <Header leftChild={<ArrowBack/>} centerText={"공지사항 작성하기"}/>
            <form method={"post"} onSubmit={handleSubmit((data) => {
                console.log(data);
            })}>
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
        </Container>
    );
};

export default NoticeCreatePage;