import Header from "@components/Header";
import ArrowBack from "@components/ArrowBack";
import InputWithLabel from "@components/InputWithLabel";
import ColoredBtn from "@components/ColoredBtn";
import {Container} from "./style.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {findPasswordSchema} from "@schemata/findPasswordSchema.ts";

const FindPasswordPage = () => {
    const {register, handleSubmit, formState:{errors}} = useForm({
        resolver: zodResolver(findPasswordSchema),
        defaultValues: {
            username: "",
            email: "",
            studentId: "",
        }
    });

    return (
        <Container>
            <Header leftChild={<ArrowBack/>} centerText={"비밀번호 찾기"}/>
            <form method={"post"} onSubmit={handleSubmit((data) => {
                console.log(data);
            })}>
                <InputWithLabel
                    label={"이 름"}
                    type={"text"}
                    placeholder={"이름을 입력해주세요"}
                    name={"username"}
                    id={"username"}
                    register={register}
                    errorMessage={errors.username?.message}
                />

                <InputWithLabel
                    label={"한양대학교 이메일 (아이디)"}
                    type={"text"}
                    placeholder={"이메일을 입력해주세요"}
                    name={"email"}
                    id={"email"}
                    register={register}
                    errorMessage={errors.email?.message}
                />

                <InputWithLabel
                    label={"학 번"}
                    type={"number"}
                    placeholder={"학번을 입력해주세요"}
                    name={"studentId"}
                    id={"student-id"}
                    register={register}
                    errorMessage={errors.studentId?.message}
                />

                <ColoredBtn type={"submit"} content={"비밀번호 찾기"} width={"full"} color={"primary"} scale={"big"}/>
            </form>
        </Container>
    );
};

export default FindPasswordPage;