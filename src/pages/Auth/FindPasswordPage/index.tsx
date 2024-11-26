import {useCallback, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";

import {Header} from "@components/common/Header";
import ArrowBack from "@components/common/ArrowBack";
import Input from "@components/common/Input";
import Button from "@components/common/Button";
import LoadingLoop from "@components/common/LoadingLoop";
import HeadTag from "@components/common/HeadTag";
import Grid from "@components/common/Grid";

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
import {headerCenter} from "@components/common/Header/style.ts";


const FindPasswordPage = () => {
    const navigate = useNavigate();

    const {lang} = useThemeStore();
    const {showToast} = useToastStore();
    const {isLoading, sendRequest, errorText, clearError} = useRequest();
    const {findPasswordSchema} = UserSchemaProvider();

    type FindPasswordForm = z.infer<typeof findPasswordSchema>;

    const {register, handleSubmit, formState:{errors, isValid}} = useForm<FindPasswordForm>({
        resolver: zodResolver(findPasswordSchema),
        defaultValues: {
            username: "",
            email: "",
        },
        mode: "onChange",
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

            <Header>
                <Grid columns={3} align={"center"} style={{width: "100%"}}>
                    <Header.Left>
                        <ArrowBack/>
                    </Header.Left>
                    <Header.Center>
                        <h2 css={headerCenter}>{headerCategories.findPassword[lang]}</h2>
                    </Header.Center>
                </Grid>
            </Header>

            {isLoading ?
                <LoadingLoop/>
                :
                <form>
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
                    <Button
                        variant={"filled"}
                        width={"full"}
                        color={"primary"}
                        size={"lg"}
                        onSubmit={handleSubmit(submitHandler)}
                        disabled={!isValid}
                    >
                        {buttonCategories.findPassword[lang]}
                    </Button>
                </form>
            }
        </Container>
    );
};

export default FindPasswordPage;