import {FC} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import Header from "@components/common/Header";
import ArrowBack from "@components/common/ArrowBack";
import Input from "@components/common/Input";
import Button from "@components/common/Button";

import {findPasswordSchema} from "@schemata/userSchema.ts";

import {Container} from "./style.ts";

const FindPasswordPage:FC = () => {
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
                <Input
                    label={"이 름"}
                    type={"text"}
                    placeholder={"이름을 입력해주세요"}
                    name={"username"}
                    id={"username"}
                    register={register}
                    errorMessage={errors.username?.message}
                />

                <Input
                    label={"한양대학교 이메일 (아이디)"}
                    type={"text"}
                    placeholder={"이메일을 입력해주세요"}
                    name={"email"}
                    id={"email"}
                    register={register}
                    errorMessage={errors.email?.message}
                />

                <Input
                    label={"학 번"}
                    type={"number"}
                    placeholder={"학번을 입력해주세요"}
                    name={"studentId"}
                    id={"student-id"}
                    register={register}
                    errorMessage={errors.studentId?.message}
                />

                <Button type={"submit"} content={"비밀번호 찾기"} width={"full"} color={"primary"} scale={"big"}/>
            </form>
        </Container>
    );
};

export default FindPasswordPage;