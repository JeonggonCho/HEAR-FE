import {FC} from "react";
import {useNavigate} from "react-router-dom";
import { z } from "zod";
import {SubmitHandler, useForm} from "react-hook-form";
import {AxiosResponse} from "axios";

import Header from "@components/common/Header";
import ArrowBack from "@components/common/ArrowBack";
import Button from "@components/common/Button";
import Input from "@components/common/Input";
import Link from "@components/common/Link";
import Modal from "@components/common/Modal";
import LoadingLoop from "@components/common/LoadingLoop";
import ErrorContent from "@components/content/ErrorContent";

import {loginSchema} from "@schemata/userSchema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import useRequest from "@hooks/useRequest.ts";
import {useAuthStore} from "@store/useAuthStore.ts";
import {useUserDataStore, useUserInfoStore} from "@store/useUserStore.ts";
import {IAuthResponseData} from "@/types/authResponse.ts";
import {placeholderCategories} from "@constants/placeholderCategories.ts";
import {inputCategories} from "@constants/inputCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {headerCategories} from "@constants/headerCategories.ts";
import {useThemeStore} from "@store/useThemeStore.ts";

import {Container, LinkWrapper} from "./style.ts";

import logo from "@assets/logo.svg";

const LoginPage:FC = () => {
    const navigate = useNavigate();

    const {login} = useAuthStore();
    const {setUserInfo} = useUserInfoStore();
    const {setUserData} = useUserDataStore();
    const {lang} = useThemeStore();

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
                countOfLaserPerWeek,
                countOfLaserPerDay,
                countOfWarning,
                tel,
                role,
                accessToken,
                refreshToken
            } = response.data;

            login(accessToken, refreshToken);
            setUserInfo({userId, email, username, studentId});
            setUserData({year, studio, passQuiz, countOfLaserPerWeek, countOfLaserPerDay, countOfWarning, tel, role});

            navigate("/");
        } catch (err) {
            console.log("로그인 실패: ", err);
        }
    };

    if (isLoading) {
        return <LoadingLoop/>
    }

    return (
        <Container>
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