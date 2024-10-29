import {FC, useCallback, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";

import Header from "@components/common/Header";
import ArrowBack from "@components/common/ArrowBack";
import Input from "@components/common/Input";
import Button from "@components/common/Button";
import LoadingLoop from "@components/common/LoadingLoop";
import HeadTag from "@components/common/HeadTag";

import useRequest from "@hooks/useRequest.ts";
import UserSchemaProvider from "@schemata/UserSchemaProvider.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {useToastStore} from "@store/useToastStore.ts";
import {placeholderCategories} from "@constants/placeholderCategories.ts";
import {inputCategories} from "@constants/inputCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {headerCategories} from "@constants/headerCategories.ts";
import {messageCategories} from "@constants/messageCategories.ts";

import {Container} from "./style.ts";


const FindPasswordPage:FC = () => {
    const navigate = useNavigate();

    const {lang} = useThemeStore();
    const {showToast} = useToastStore();
    const {isLoading, sendRequest, errorText, clearError} = useRequest();
    const {findPasswordSchema} = UserSchemaProvider();

    type FindPasswordForm = z.infer<typeof findPasswordSchema>;

    const {register, handleSubmit, formState:{errors}} = useForm<FindPasswordForm>({
        resolver: zodResolver(findPasswordSchema),
        defaultValues: {
            username: "",
            email: "",
            studentId: "",
        }
    });

    // 비밀번호 찾기 요청
    const submitHandler:SubmitHandler<FindPasswordForm> = useCallback(async (data) => {
        try {
            const response = await sendRequest({
                url: "/users/find-password",
                method: "patch",
                data: data,
            });
            if (response.data) {
                showToast(messageCategories.findPasswordDone[lang], "success");
                navigate("/login", {replace: true});
            }
        } catch (err) {
            console.error("비밀번호 찾기 중 에러 발생: ", err);
        }
    }, [sendRequest, showToast, navigate]);

    // 에러 발생
    useEffect(() => {
        if (errorText) showToast(errorText, "error");
        const errorTimer = setTimeout(() => clearError(), 6000);
        return () => clearTimeout(errorTimer);
    }, [errorText]);

    return (
        <Container>
            <HeadTag title={headerCategories.findPassword[lang]}/>

            <Header leftChild={<ArrowBack/>} centerText={headerCategories.findPassword[lang]}/>

            {isLoading ?
                <LoadingLoop/>
                :
                <form onSubmit={handleSubmit(submitHandler)}>
                    <Input
                        label={inputCategories.username[lang]}
                        type={"text"}
                        placeholder={placeholderCategories.username[lang]}
                        name={"username"}
                        id={"username"}
                        register={register}
                        errorMessage={errors.username?.message}
                    />
                    <Input
                        label={inputCategories.hyuEmail[lang]}
                        type={"text"}
                        placeholder={placeholderCategories.email[lang]}
                        name={"email"}
                        id={"email"}
                        register={register}
                        errorMessage={errors.email?.message}
                    />
                    <Input
                        label={inputCategories.studentId[lang]}
                        type={"number"}
                        placeholder={placeholderCategories.studentId[lang]}
                        name={"studentId"}
                        id={"student-id"}
                        register={register}
                        errorMessage={errors.studentId?.message}
                    />
                    <Button type={"submit"} content={buttonCategories.findPassword[lang]} width={"full"} color={"primary"} scale={"big"}/>
                </form>
            }
        </Container>
    );
};

export default FindPasswordPage;