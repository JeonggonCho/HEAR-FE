import {FC} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import Header from "@components/common/Header";
import ArrowBack from "@components/common/ArrowBack";
import Input from "@components/common/Input";
import Button from "@components/common/Button";
import HeadTag from "@components/common/HeadTag";

import {findPasswordSchema} from "@schemata/userSchema.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {placeholderCategories} from "@constants/placeholderCategories.ts";
import {inputCategories} from "@constants/inputCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {headerCategories} from "@constants/headerCategories.ts";

import {Container} from "./style.ts";

const FindPasswordPage:FC = () => {
    const {lang} = useThemeStore();

    const {register, handleSubmit, formState:{errors}} = useForm({
        resolver: zodResolver(findPasswordSchema),
        defaultValues: {
            username: "",
            email: "",
            studentId: "",
        }
    });

    return (
        <Container>
            <HeadTag title={headerCategories.findPassword[lang]}/>

            <Header leftChild={<ArrowBack/>} centerText={headerCategories.findPassword[lang]}/>
            <form method={"post"} onSubmit={handleSubmit((data) => {
                console.log(data);
            })}>
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
        </Container>
    );
};

export default FindPasswordPage;