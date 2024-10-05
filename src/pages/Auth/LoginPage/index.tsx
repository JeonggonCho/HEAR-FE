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
import {buttonLabels, headerTitle, inputLabels, placeholders} from "@constants/langCategories.ts";
import {useThemeStore} from "@store/useThemeStore.ts";

import {Container} from "./style.ts";

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

    return (
        <Container>
            <Header leftChild={<ArrowBack/>} centerText={headerTitle.signIn[lang]}/>
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
                        <Input
                            label={inputLabels.hyuEmail[lang]}
                            type={"text"}
                            placeholder={placeholders.email[lang]}
                            id={"email"}
                            name={"email"}
                            register={register}
                            errorMessage={errors.email?.message}
                        />

                        <Input
                            label={inputLabels.password[lang]}
                            type={"password"}
                            placeholder={placeholders.password[lang]}
                            id={"password"}
                            name={"password"}
                            register={register}
                            errorMessage={errors.password?.message}
                            visibleToggle={true}
                        />

                        <Button
                            type={"submit"}
                            content={buttonLabels.signIn[lang]}
                            width={"full"}
                            color={"primary"}
                            scale={"big"}
                        />
                    </form>

                    <Link text={buttonLabels.signUp[lang]} to={"/signup"} color={"primary"}/>
                    <Link text={buttonLabels.findPassword[lang]} to={"/password/reset"} color={"second"}/>
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