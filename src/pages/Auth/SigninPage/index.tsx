import {FC, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import { z } from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {AxiosResponse} from "axios";

import Header from "@components/common/Header";
import ArrowBack from "@components/common/ArrowBack";
import Button from "@components/common/Button";
import Input from "@components/common/Input";
import Link from "@components/common/Link";
import LoadingLoop from "@components/common/LoadingLoop";
import HeadTag from "@components/common/HeadTag";

import UserSchemaProvider from "@schemata/UserSchemaProvider.ts";
import useRequest from "@hooks/useRequest.ts";
import {IAuthResponseData} from "@/types/authResponse.ts";
import {useAuthStore} from "@store/useAuthStore.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {useUserDataStore, useUserInfoStore} from "@store/useUserStore.ts";
import {useToastStore} from "@store/useToastStore.ts";
import {placeholderCategories} from "@constants/placeholderCategories.ts";
import {inputCategories} from "@constants/inputCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {headerCategories} from "@constants/headerCategories.ts";

import {Container, LinkWrapper} from "./style.ts";

import logo from "@assets/logo.svg";


const SigninPage:FC = () => {
    const navigate = useNavigate();

    const {login} = useAuthStore();
    const {setUserInfo} = useUserInfoStore();
    const {setUserData} = useUserDataStore();
    const {lang} = useThemeStore();
    const {showToast} = useToastStore();
    const {isLoading, errorText, sendRequest, clearError} = useRequest();
    const {loginSchema} = UserSchemaProvider();

    type LoginFormData = z.infer<typeof loginSchema>;

    const {register, handleSubmit, formState:{errors}} = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    // 로그인 요청
    const submitHandler: SubmitHandler<LoginFormData> = async (data) => {
        try {
            const response:AxiosResponse<IAuthResponseData> = await sendRequest({
                url: "/users/login",
                method: "post",
                data: data
            });
            const {userId, email, username, studentId, year, studio, passQuiz, countOfLaserPerWeek, countOfLaserPerDay, countOfWarning, tel, role, accessToken, refreshToken, lab} = response.data;
            login(accessToken, refreshToken);
            setUserInfo({userId, email, username, studentId});
            setUserData({year, studio, passQuiz, countOfLaserPerWeek, countOfLaserPerDay, countOfWarning, tel, role, lab});

            navigate("/");
        } catch (err) {
            console.log("로그인 실패: ", err);
        }
    };

    // 에러 메시지
    useEffect(() => {
        if (errorText) showToast(errorText, "error");
        const errorTimer = setTimeout(() => clearError(), 6000);
        return () => clearTimeout(errorTimer);
    }, [errorText]);

    if (isLoading) {
        return <LoadingLoop/>
    }

    return (
        <Container>
            <HeadTag title={headerCategories.signIn[lang]}/>

            <Header leftChild={<ArrowBack/>} centerText={headerCategories.signIn[lang]}/>

            <div>
                <div>
                    <img src={logo} alt="로고"/>
                </div>

                <h3>HEAR</h3>
            </div>

            <form onSubmit={handleSubmit(submitHandler)}>
                <Input
                    label={inputCategories.hyuEmail[lang]}
                    type={"text"}
                    placeholder={placeholderCategories.email[lang]}
                    id={"email"}
                    name={"email"}
                    register={register}
                    errorMessage={errors.email?.message}
                />

                <Input
                    label={inputCategories.password[lang]}
                    type={"password"}
                    placeholder={placeholderCategories.password[lang]}
                    id={"password"}
                    name={"password"}
                    register={register}
                    errorMessage={errors.password?.message}
                    visibleToggle={true}
                />

                <Button
                    type={"submit"}
                    content={buttonCategories.signIn[lang]}
                    width={"full"}
                    color={"primary"}
                    scale={"big"}
                />
            </form>

            <LinkWrapper>
                <Link
                    type={"text"}
                    name={buttonCategories.signUp[lang]}
                    to={"/signup"}
                    color={"primary"}
                />
                <Link
                    type={"text"}
                    name={buttonCategories.findPassword[lang]}
                    to={"/password/reset"}
                    color={"second"}
                />
            </LinkWrapper>
        </Container>
    );
};

export default SigninPage;