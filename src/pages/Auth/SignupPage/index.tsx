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
import Modal from "@components/common/Modal";
import LoadingLoop from "@components/common/LoadingLoop";
import ErrorContent from "@components/content/ErrorContent";

import {yearCategories} from "@constants/yearCategories.ts";
import {signupSchema} from "@schemata/userSchema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import useRequest from "@hooks/useRequest.ts";
import {useAuthStore} from "@store/useAuthStore.ts";
import {useUserDataStore, useUserInfoStore} from "@store/useUserStore.ts";
import {IAuthResponseData} from "@/types/authResponse.ts";
import {buttonLabels, headerTitle, inputLabels, placeholders} from "@constants/langCategories.ts";
import {useThemeStore} from "@store/useThemeStore.ts";

import {Container} from "./style.ts";

const SignupPage:FC = () => {
    const navigate = useNavigate();

    const {login} = useAuthStore();
    const {setUserInfo} = useUserInfoStore();
    const {setUserData} = useUserDataStore();
    const {lang} = useThemeStore();

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
            <Header leftChild={<ArrowBack/>} centerText={headerTitle.signUp[lang]}/>
            {isLoading ?
                <LoadingLoop/>
                :
                <>
                    <form onSubmit={handleSubmit(submitHandler)}>
                        <Input
                            label={inputLabels.username[lang]}
                            type={"text"}
                            placeholder={placeholders.username[lang]}
                            id={"username"}
                            name={"username"}
                            register={register}
                            errorMessage={errors.username?.message}
                        />

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

                        <Input
                            label={inputLabels.confirmPassword[lang]}
                            type={"password"}
                            placeholder={placeholders.confirmPassword[lang]}
                            id={"confirm-password"}
                            name={"confirmPassword"}
                            register={register}
                            errorMessage={errors.confirmPassword?.message}
                            visibleToggle={true}
                        />

                        <Select
                            label={inputLabels.year[lang]}
                            categories={yearCategories}
                            name={"year"}
                            register={register}
                            errorMessage={errors.year?.message}
                            type={"radio"}
                        />

                        <Input
                            label={inputLabels.studentId[lang]}
                            type={"number"}
                            placeholder={placeholders.studentId[lang]}
                            id={"student-id"}
                            name={"studentId"}
                            register={register}
                            errorMessage={errors.studentId?.message}
                        />

                        <Input
                            label={inputLabels.studio[lang]}
                            type={"text"}
                            placeholder={placeholders.studio[lang]}
                            id={"studio"}
                            name={"studio"}
                            register={register}
                            errorMessage={errors.studio?.message}
                        />

                        <Input
                            label={inputLabels.tel[lang]}
                            type={"tel"}
                            placeholder={placeholders.tel[lang]}
                            id={"tel"}
                            name={"tel"}
                            register={register}
                            errorMessage={errors.tel?.message}
                        />

                        <Button type={"submit"} content={buttonLabels.signUp[lang]} width={"full"} color={"primary"} scale={"big"}/>
                    </form>
                    <Link text={buttonLabels.signIn[lang]} to={"/login"} color={"primary"}/>
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

export default SignupPage;