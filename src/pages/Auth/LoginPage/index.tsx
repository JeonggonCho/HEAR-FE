import Header from "@components/Header";
import ArrowBack from "@components/ArrowBack";
import ColoredBtn from "@components/ColoredBtn";
import InputWithLabel from "@components/InputWithLabel";
import Link from "@components/Link";
import {Container} from "./style.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {loginSchema} from "@schemata/loginSchema.ts";
import logo from "@assets/logo.svg";

const LoginPage = () => {

    const {register, handleSubmit, formState:{errors}} = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    return (
        <Container>
            <Header leftChild={<ArrowBack/>} centerText={"로그인"}/>

            <div>
                <div>
                    <img src={logo} alt="로고"/>
                </div>

                <h3>HEAR</h3>
            </div>

            <form method={"post"} onSubmit={handleSubmit((data) => {
                console.log(data);
            })}>
                <InputWithLabel
                    label={"한양대학교 이메일"}
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
                    visibleToggle={true}
                />

                <ColoredBtn
                    type={"submit"}
                    content={"로그인"}
                    width={"full"}
                    color={"primary"}
                    scale={"big"}
                />
            </form>
            <Link text={"비밀번호 찾기"} to={"/password/reset"} color={"second"}/>
            <Link text={"회원가입"} to={"/signup"} color={"primary"}/>
        </Container>
    );
};

export default LoginPage;