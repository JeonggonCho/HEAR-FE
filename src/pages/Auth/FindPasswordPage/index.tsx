import {FC} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import Header from "@components/common/Header";
import ArrowBack from "@components/common/ArrowBack";
import Input from "@components/common/Input";
import Button from "@components/common/Button";

import {findPasswordSchema} from "@schemata/userSchema.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {buttonLabels, headerTitle, inputLabels, placeholders} from "@constants/langCategories.ts";

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
            <Header leftChild={<ArrowBack/>} centerText={headerTitle.findPassword[lang]}/>
            <form method={"post"} onSubmit={handleSubmit((data) => {
                console.log(data);
            })}>
                <Input
                    label={inputLabels.username[lang]}
                    type={"text"}
                    placeholder={placeholders.username[lang]}
                    name={"username"}
                    id={"username"}
                    register={register}
                    errorMessage={errors.username?.message}
                />

                <Input
                    label={inputLabels.hyuEmail[lang]}
                    type={"text"}
                    placeholder={placeholders.email[lang]}
                    name={"email"}
                    id={"email"}
                    register={register}
                    errorMessage={errors.email?.message}
                />

                <Input
                    label={inputLabels.studentId[lang]}
                    type={"number"}
                    placeholder={placeholders.studentId[lang]}
                    name={"studentId"}
                    id={"student-id"}
                    register={register}
                    errorMessage={errors.studentId?.message}
                />

                <Button type={"submit"} content={buttonLabels.findPassword[lang]} width={"full"} color={"primary"} scale={"big"}/>
            </form>
        </Container>
    );
};

export default FindPasswordPage;