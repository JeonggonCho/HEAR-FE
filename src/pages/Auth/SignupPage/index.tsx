import {FC} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {z} from "zod";
import {useNavigate} from "react-router-dom";
import {AxiosResponse} from "axios";

import Header from "@components/common/Header";
import ArrowBack from "@components/common/ArrowBack";
import Button from "@components/common/Button";
import Input from "@components/common/Input";
import Link from "@components/common/Link";
import Select from "@components/common/Select";
import LoadingLoop from "@components/common/LoadingLoop";
import Toast from "@components/common/Toast";
import HeadTag from "@components/common/HeadTag";

import {signupSchema} from "@schemata/userSchema.ts";
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

import {Container} from "./style.ts";

const SignupPage:FC = () => {
    const navigate = useNavigate();

    const {login} = useAuthStore();
    const {setUserInfo} = useUserInfoStore();
    const {setUserData} = useUserDataStore();
    const {lang} = useThemeStore();

    const yearCategories = [
        {label: inputCategories.first[lang], value: "1", id: "select-1"},
        {label: inputCategories.second[lang], value: "2", id: "select-2"},
        {label: inputCategories.third[lang], value: "3", id: "select-3"},
        {label: inputCategories.fourth[lang], value: "4", id: "select-4"},
        {label: inputCategories.fifth[lang], value: "5", id: "select-5"},
    ];

    const {isLoading, errorText, sendRequest, clearError} = useRequest();

    type SignupFormData = z.infer<typeof signupSchema>;

    const {register, handleSubmit, formState:{errors}} = useForm<SignupFormData>({
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

    const submitHandler: SubmitHandler<SignupFormData> = async (data) => {
        try {
            const response: AxiosResponse<IAuthResponseData> = await sendRequest({
                url: "/users/signup",
                method: "post",
                data: data
            });
            const {userId, email, username, studentId, year, studio, passQuiz, countOfLaserPerWeek, countOfLaserPerDay, countOfWarning, tel, role, accessToken, refreshToken} = response.data;

            login(accessToken, refreshToken);
            setUserInfo({userId, email, username, studentId});
            setUserData({year, studio, passQuiz, countOfLaserPerDay, countOfLaserPerWeek, countOfWarning, tel, role});

            navigate("/signup/done", { replace: true });
        } catch (err) {
            console.error("회원가입 실패: ", err);
        }
    };

    return (
        <Container>
            <HeadTag title={headerCategories.signUp[lang]}/>

            <Header leftChild={<ArrowBack/>} centerText={headerCategories.signUp[lang]}/>
            {isLoading ?
                <LoadingLoop/>
                :
                <>
                    <form onSubmit={handleSubmit(submitHandler)}>
                        <Input
                            label={inputCategories.username[lang]}
                            type={"text"}
                            placeholder={placeholderCategories.username[lang]}
                            id={"username"}
                            name={"username"}
                            register={register}
                            errorMessage={errors.username?.message}
                        />

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

                        <Input
                            label={inputCategories.confirmPassword[lang]}
                            type={"password"}
                            placeholder={placeholderCategories.confirmPassword[lang]}
                            id={"confirm-password"}
                            name={"confirmPassword"}
                            register={register}
                            errorMessage={errors.confirmPassword?.message}
                            visibleToggle={true}
                        />

                        <Select
                            label={inputCategories.year[lang]}
                            categories={yearCategories}
                            name={"year"}
                            register={register}
                            errorMessage={errors.year?.message}
                            type={"radio"}
                        />

                        <Input
                            label={inputCategories.studentId[lang]}
                            type={"number"}
                            placeholder={placeholderCategories.studentId[lang]}
                            id={"student-id"}
                            name={"studentId"}
                            register={register}
                            errorMessage={errors.studentId?.message}
                        />

                        <Input
                            label={inputCategories.studio[lang]}
                            type={"text"}
                            placeholder={placeholderCategories.studio[lang]}
                            id={"studio"}
                            name={"studio"}
                            register={register}
                            errorMessage={errors.studio?.message}
                        />

                        <Input
                            label={inputCategories.tel[lang]}
                            type={"tel"}
                            placeholder={placeholderCategories.tel[lang]}
                            id={"tel"}
                            name={"tel"}
                            register={register}
                            errorMessage={errors.tel?.message}
                        />

                        <Button type={"submit"} content={buttonCategories.signUp[lang]} width={"full"} color={"primary"} scale={"big"}/>
                    </form>
                    <Link
                        type={"text"}
                        name={buttonCategories.signIn[lang]}
                        to={"/login"}
                        color={"primary"}
                    />
                </>
            }

            {errorText &&
                <Toast text={errorText} setToast={clearError}/>
            }
        </Container>
    );
};

export default SignupPage;