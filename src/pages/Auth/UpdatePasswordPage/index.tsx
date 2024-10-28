import {FC, useCallback, useEffect, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";

import Header from "@components/common/Header";
import ArrowBack from "@components/common/ArrowBack";
import HeadTag from "@components/common/HeadTag";
import Input from "@components/common/Input";
import Button from "@components/common/Button";
import LoadingLoop from "@components/common/LoadingLoop";
import Modal from "@components/common/Modal";
import ConfirmContent from "@components/content/ConfirmContent";

import useRequest from "@hooks/useRequest.ts";
import UserSchemaProvider from "@schemata/UserSchemaProvider.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {useToastStore} from "@store/useToastStore.ts";
import {headerCategories} from "@constants/headerCategories.ts";
import {inputCategories} from "@constants/inputCategories.ts";
import {placeholderCategories} from "@constants/placeholderCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {messageCategories} from "@constants/messageCategories.ts";

import {Container} from "./style.ts";


const UpdatePasswordPage:FC = () => {
    const [formData, setFormData] = useState<any>(null);
    const [updatePasswordModal, setUpdatePasswordModal] = useState<boolean>(false);

    const navigate = useNavigate();

    const {lang} = useThemeStore();
    const {showToast} = useToastStore();
    const {isLoading, sendRequest, errorText, clearError} = useRequest();
    const {updatePasswordSchema} = UserSchemaProvider();

    type UpdatePasswordForm = z.infer<typeof updatePasswordSchema>;

    const {register, handleSubmit, formState: {errors}} = useForm<UpdatePasswordForm>({
        resolver: zodResolver(updatePasswordSchema),
        defaultValues: {
            password: "",
            newPassword: "",
            confirmPassword: "",
        },
    });

    // 비밀번호 변경 버튼 클릭 시, 유효성 검사 및 confirm 모달 보이기
    const submitHandler:SubmitHandler<UpdatePasswordForm> = (data) => {
        setFormData(data);
        setUpdatePasswordModal(true);
    };

    // 비밀번호 변경 요청
    const handleConfirmUpdate = useCallback(async () => {
        if (!formData) return;
        try {
            await sendRequest({
                url: "/users/password",
                method: "patch",
                data: formData,
            });
            showToast(messageCategories.updatePasswordDone[lang], "success");
            navigate("/account", {replace: true});
        } catch (err) {
            console.error("비밀번호 변경 중 에러 발생: ", err);
        } finally {
            setUpdatePasswordModal(false);
        }
    }, [formData, sendRequest, setUpdatePasswordModal, showToast, navigate]);

    // 에러 메시지
    useEffect(() => {
        if (errorText) showToast(errorText, "error");
        const errorTimer = setTimeout(() => clearError(), 6000);
        return () => clearTimeout(errorTimer);
    }, [errorText]);

    // 비밀번호 변경 확인 모달 컨텐츠
    const UpdatePasswordModalContent = () => (
        <ConfirmContent
            text={messageCategories.confirmUpdatePassword[lang]}
            leftBtn={
                <Button
                    type={"button"}
                    content={buttonCategories.close[lang]}
                    width={"full"}
                    color={"third"}
                    scale={"normal"}
                    onClick={() => setUpdatePasswordModal(false)}
                />
            }
            rightBtn={
                <Button
                    type={"submit"}
                    content={buttonCategories.editing[lang]}
                    width={"full"}
                    color={"approval"}
                    scale={"normal"}
                    onClick={handleConfirmUpdate}
                />
            }
        />
    );


    return (
        <Container>
            <HeadTag title={headerCategories.passwordChange[lang]}/>

            <Header leftChild={<ArrowBack/>} centerText={headerCategories.passwordChange[lang]}/>

            {isLoading ?
                <LoadingLoop/>
                :
                <form onSubmit={handleSubmit(submitHandler)}>
                    <Input
                        label={inputCategories.currentPassword[lang]}
                        placeholder={placeholderCategories.password[lang]}
                        type={"password"}
                        id={"password"}
                        name={"password"}
                        register={register}
                        errorMessage={errors.password?.message}
                        visibleToggle={true}
                    />
                    <Input
                        label={inputCategories.newPassword[lang]}
                        placeholder={placeholderCategories.password[lang]}
                        type={"password"}
                        id={"newPassword"}
                        name={"newPassword"}
                        register={register}
                        errorMessage={errors.newPassword?.message}
                        visibleToggle={true}
                    />
                    <Input
                        label={inputCategories.confirmNewPassword[lang]}
                        placeholder={placeholderCategories.password[lang]}
                        type={"password"}
                        id={"confirmPassword"}
                        name={"confirmPassword"}
                        register={register}
                        errorMessage={errors.confirmPassword?.message}
                        visibleToggle={true}
                    />
                    <Button
                        type={"submit"}
                        content={buttonCategories.passwordChange[lang]}
                        width={"full"}
                        color={"primary"}
                        scale={"big"}
                    />
                </form>
            }

            {updatePasswordModal &&
                <Modal
                  content={<UpdatePasswordModalContent/>}
                  setModal={setUpdatePasswordModal}
                  type={"popup"}
                />
            }
        </Container>
    );
};

export default UpdatePasswordPage;