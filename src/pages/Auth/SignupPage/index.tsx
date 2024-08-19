import Header from "@components/Header";
import ArrowBack from "@components/ArrowBack";
import ColoredBtn from "@components/ColoredBtn";
import InputWithLabel from "@components/InputWithLabel";
import Link from "@components/Link";
import {Container} from "./style.ts";
import Select from "@components/Select";
import {yearCategories} from "@constants/yearCategories.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {signupSchema} from "@schemata/signupSchema.ts";

const SignupPage = () => {
    const {register, handleSubmit, formState:{errors}} = useForm({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            year: "1",
            studentId: "",
            studio: "",
            tel: "",
        }
    });

    return (
        <Container>
            <Header leftChild={<ArrowBack/>} centerText={"회원가입"}/>
            <form method={"post"} onSubmit={handleSubmit((data) => {
                console.log(data);
            })}>
                <InputWithLabel
                    label={"이름"}
                    type={"text"}
                    placeholder={"이름을 입력해주세요"}
                    id={"username"}
                    name={"username"}
                    register={register}
                    errorMessage={errors.username?.message}
                />

                <InputWithLabel
                    label={"한양대학교 이메일 (아이디)"}
                    type={"text"}
                    placeholder={"이메일을 입력해주세요"}
                    id={"email"}
                    name={"email"}
                    register={register}
                    errorMessage={errors.email?.message}
                />

                <InputWithLabel
                    label={"비밀번호"}
                    type={"password"}
                    placeholder={"비밀번호를 입력해주세요"}
                    id={"password"}
                    name={"password"}
                    register={register}
                    errorMessage={errors.password?.message}
                />

                <InputWithLabel
                    label={"비밀번호 확인"}
                    type={"password"}
                    placeholder={"비밀번호를 한번 더 입력해주세요"}
                    id={"confirm-password"}
                    name={"confirmPassword"}
                    register={register}
                    errorMessage={errors.confirmPassword?.message}
                />

                <Select
                    label={"학 년"}
                    categories={yearCategories}
                    name={"year"}
                    register={register}
                    errorMessage={errors.year?.message}
                />

                <InputWithLabel
                    label={"학 번"}
                    type={"number"}
                    placeholder={"학번을 입력해주세요"}
                    id={"student-id"}
                    name={"studentId"}
                    register={register}
                    errorMessage={errors.studentId?.message}
                />

                <InputWithLabel
                    label={"스튜디오 지도 교수님"}
                    type={"text"}
                    placeholder={"지도 교수님 이름을 입력해주세요"}
                    id={"studio"}
                    name={"studio"}
                    register={register}
                    errorMessage={errors.studio?.message}
                />

                <InputWithLabel
                    label={"전화번호"}
                    type={"tel"}
                    placeholder={"전화번호를 입력해주세요"}
                    id={"tel"}
                    name={"tel"}
                    register={register}
                    errorMessage={errors.tel?.message}
                />

                <ColoredBtn type={"submit"} text={"회원가입"} width={"full"} color={"primary"} scale={"big"}/>
            </form>
            <Link text={"로그인"} to={"/login"} color={"primary"}/>
        </Container>
    );
};

export default SignupPage;