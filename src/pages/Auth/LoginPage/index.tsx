import {FC} from "react";
import {useNavigate} from "react-router-dom";
import { z } from "zod";
import {SubmitHandler, useForm} from "react-hook-form";
import {AxiosResponse} from "axios";

import Header from "@components/Header";
import ArrowBack from "@components/ArrowBack";
import ColoredBtn from "@components/ColoredBtn";
import InputWithLabel from "@components/InputWithLabel";
import Link from "@components/Link";
import Modal from "@components/Modal";
import LoadingLoop from "@components/LoadingLoop";
import ErrorContent from "@components/ErrorContent";

import {loginSchema} from "@schemata/authSchema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import useRequest from "@hooks/useRequest.ts";
import {useAuthStore} from "@store/useAuthStore.ts";
import {useUserDataStore, useUserInfoStore} from "@store/useUserStore.ts";
import {IAuthResponseData} from "@/types/authResponse.ts";

import {Container} from "./style.ts";

import logo from "@assets/logo.svg";

const LoginPage:FC = () => {
    const navigate = useNavigate();

    const {login} = useAuthStore();
    const {setUserInfo} = useUserInfoStore();
    const {setUserData} = useUserDataStore();
    const {isLoading, errorText, sendRequest, clearError} = useRequest();

    type LoginFormData = z.infer<typeof loginSchema>;

    const {register, handleSubmit, formState:{errors}} = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const submitHandler: SubmitHandler<LoginFormData> = async (data) => {
        try {
            const response:AxiosResponse<IAuthResponseData> = await sendRequest({
                url: "/users/login",
                method: "post",
                data: data
            });
            const {
                userId,
                email,
                username,
                studentId,
                year,
                studio,
                passQuiz,
                countOfLaser,
                countOfWarning,
                tel,
                role,
                accessToken,
                refreshToken
            } = response.data;

            login(accessToken, refreshToken);
            setUserInfo({userId, email, username, studentId});
            setUserData({year, studio, passQuiz, countOfLaser, countOfWarning, tel, role});

            navigate("/");
        } catch (err) {
            console.log("로그인 실패: ", err);
        }
    };

    return (
        <Container>
            <Header leftChild={<ArrowBack/>} centerText={"로그인"}/>
            {isLoading ?
                <LoadingLoop/>
                :
                <>
                    <div>
                        <div>
                            <img src={logo} alt="로고"/>
                        </div>

                        <h3>HEAR</h3>
                    </div>

                    <form onSubmit={handleSubmit(submitHandler)}>
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

                    <Link text={"회원가입"} to={"/signup"} color={"primary"}/>
                    <Link text={"비밀번호 찾기"} to={"/password/reset"} color={"second"}/>
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

export default LoginPage;