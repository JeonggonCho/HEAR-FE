import {FC, useCallback, useEffect, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";

import Header from "@components/common/Header";
import ArrowBack from "@components/common/ArrowBack";
import Input from "@components/common/Input";
import Button from "@components/common/Button";
import Modal from "@components/common/Modal";
import ModalConfirmContent from "@components/common/ModalConfirmContent";
import LoadingLoop from "@components/common/LoadingLoop";
import HeadTag from "@components/common/HeadTag";

import useRequest from "@hooks/useRequest.ts";
import UserSchemaProvider from "@schemata/UserSchemaProvider.ts";
import {useUserDataStore, useUserInfoStore} from "@store/useUserStore.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {useToastStore} from "@store/useToastStore.ts";
import {placeholderCategories} from "@constants/placeholderCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {headerCategories} from "@constants/headerCategories.ts";
import {inputCategories} from "@constants/inputCategories.ts";
import {messageCategories} from "@constants/messageCategories.ts";

import {Container} from "./style.ts";


const UpdateAccountPage:FC = () => {
    const [formData, setFormData] = useState<any>(null);
    const [updateAccountModal, setUpdateAccountModal] = useState<boolean>(false);

    const navigate = useNavigate();

    const {lang} = useThemeStore();
    const {showToast} = useToastStore();
    const {userInfo, setUserInfo} = useUserInfoStore();
    const {userData, setUserData} = useUserDataStore();
    const {isLoading, errorText, sendRequest, clearError} = useRequest();
    const {updateStudentAccountSchema, updateAssistantAccountSchema} = UserSchemaProvider();

    const fetchUser = useCallback(async () => {
        if (userInfo && userData) {
            try {
                const response = await sendRequest({
                    url: "/users",
                    method: "get",
                });
                const {userId, username, email, year, studentId, studio, passEducation, countOfLaserPerWeek, countOfLaserPerDay, countOfWarning, tel, role, lab} = response.data;
                setUserData({year, studio, passEducation, countOfLaserPerWeek, countOfLaserPerDay, countOfWarning, tel, role, lab});
                setUserInfo({userId, username, email, studentId});
            } catch (err) {
                console.error("유저 정보 조회 에러: ", err);
            }
        }
    }, [sendRequest, setUserData, setUserInfo]);

    // 유저 데이터 조회
    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    type UpdateStudentAccountFormData = z.infer<typeof updateStudentAccountSchema>;
    type UpdateAssistantAccountFormData = z.infer<typeof updateAssistantAccountSchema>;


    // 학생 유저의 폼
    const {
        register: studentRegister,
        handleSubmit: studentHandleSubmit,
        formState: {
            errors: studentErrors,
        },
        reset: studentReset,
    } = useForm<UpdateStudentAccountFormData>({
        resolver: zodResolver(updateStudentAccountSchema),
        defaultValues: {
            username: "",
            studentId: "",
            tel: "",
        },
    });

    // 조교 유저의 폼
    const {
        register: assistantRegister,
        handleSubmit: assistantHandleSubmit,
        formState: {
            errors: assistantErrors,
        },
        reset: assistantReset,
    } = useForm<UpdateAssistantAccountFormData>({
        resolver: zodResolver(updateAssistantAccountSchema),
        defaultValues: {
            username: "",
            studentId: "",
            tel: "",
            lab: "",
        },
    });

    // 초기 값 채우기
    useEffect(() => {
        if (userInfo && userData) {
            if (userData.role === "student") {
                studentReset({
                    username: userInfo.username,
                    studentId: userInfo.studentId,
                    tel: userData.tel,
                });
            } else if (userData.role === "assistant") {
                assistantReset({
                    username: userInfo.username,
                    studentId: userInfo.studentId,
                    tel: userData.tel,
                    lab: userData.lab,
                });
            }
        }
    }, [userInfo, userData]);

    // 에러 메시지
    useEffect(() => {
        if (errorText) showToast(errorText, "error");
        const errorTimer = setTimeout(() => clearError(), 6000);
        return () => clearTimeout(errorTimer);
    }, [errorText]);

    // 내 정보 변경 버튼 클릭 시, 유효성 검사 및 confirm 모달 보이기
    const submitHandler: SubmitHandler<UpdateStudentAccountFormData> = (data) => {
        setFormData(data);
        setUpdateAccountModal(true);
    };

    // confirm 모달에서 수정하기 클릭 시, 수정 요청 보내기
    const handleConfirmUpdate = async () => {
        if (!formData) return;
        try {
            await sendRequest({
                url: "/users",
                method: "patch",
                data: formData,
            });
            showToast(messageCategories.updateAccountDone[lang], "success");
            navigate("/account", {replace: true});
        } catch (err) {
            setUpdateAccountModal(false);
            console.error("내 정보 변경 중 에러 발생: ", err);
        }
    };

    // 내 정보 변경 확인 모달 컨텐츠
    const UpdateAccountModalContent = () => (
        <ModalConfirmContent
            text={messageCategories.confirmUpdateAccount[lang]}
            leftBtn={
                <Button
                    type={"button"}
                    content={buttonCategories.close[lang]}
                    width={"full"}
                    color={"third"}
                    scale={"normal"}
                    onClick={() => {setUpdateAccountModal(false)}}
                />
            }
            rightBtn={
                <Button
                    type={"submit"}
                    content={buttonCategories.changing[lang]}
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
            <HeadTag title={headerCategories.profileUpdate[lang]}/>

            <Header leftChild={<ArrowBack/>} centerText={headerCategories.profileUpdate[lang]}/>
            {isLoading ?
                <LoadingLoop/>
                :
                <>
                    {userData?.role === "student" ?
                        <form onSubmit={studentHandleSubmit(submitHandler)}>
                            <Input
                                label={inputCategories.username[lang]}
                                type={"text"}
                                placeholder={placeholderCategories.username[lang]}
                                id={"username"}
                                name={"username"}
                                register={studentRegister}
                                errorMessage={studentErrors.username?.message}
                            />

                            <Input
                                label={inputCategories.studentId[lang]}
                                type={"number"}
                                placeholder={placeholderCategories.studentId[lang]}
                                id={"student-id"}
                                name={"studentId"}
                                register={studentRegister}
                                errorMessage={studentErrors.studentId?.message}
                            />

                            <Input
                                label={inputCategories.tel[lang]}
                                type={"tel"}
                                placeholder={placeholderCategories.tel[lang]}
                                id={"tel"}
                                name={"tel"}
                                register={studentRegister}
                                errorMessage={studentErrors.tel?.message}
                            />

                            <Button
                                type={"submit"}
                                content={buttonCategories.profileUpdate[lang]}
                                width={"full"}
                                color={"primary"}
                                scale={"big"}
                            />
                        </form>
                        : userData?.role === "assistant" ?
                            <form onSubmit={assistantHandleSubmit(submitHandler)}>
                                <Input
                                    label={inputCategories.username[lang]}
                                    type={"text"}
                                    placeholder={placeholderCategories.username[lang]}
                                    id={"username"}
                                    name={"username"}
                                    register={assistantRegister}
                                    errorMessage={assistantErrors.username?.message}
                                />

                                <Input
                                    label={inputCategories.studentId[lang]}
                                    type={"number"}
                                    placeholder={placeholderCategories.studentId[lang]}
                                    id={"student-id"}
                                    name={"studentId"}
                                    register={assistantRegister}
                                    errorMessage={assistantErrors.studentId?.message}
                                />

                                <Input
                                    label={inputCategories.tel[lang]}
                                    type={"tel"}
                                    placeholder={placeholderCategories.tel[lang]}
                                    id={"tel"}
                                    name={"tel"}
                                    register={assistantRegister}
                                    errorMessage={assistantErrors.tel?.message}
                                />

                                <Input
                                    label={inputCategories.lab[lang]}
                                    type={"text"}
                                    placeholder={placeholderCategories.lab[lang]}
                                    id={"lab"}
                                    name={"lab"}
                                    register={assistantRegister}
                                    errorMessage={assistantErrors.lab?.message}
                                />

                                <Button
                                    type={"submit"}
                                    content={buttonCategories.profileUpdate[lang]}
                                    width={"full"}
                                    color={"primary"}
                                    scale={"big"}
                                />
                            </form>
                            : null
                    }

                    {updateAccountModal &&
                      <Modal
                        content={<UpdateAccountModalContent/>}
                        setModal={setUpdateAccountModal}
                        type={"popup"}
                      />
                    }
                </>
            }
        </Container>
    );
};

export default UpdateAccountPage;