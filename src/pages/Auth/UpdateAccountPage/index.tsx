import {FC, useCallback, useEffect, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";

import Header from "@components/common/Header";
import ArrowBack from "@components/common/ArrowBack";
import Select from "@components/common/Select";
import Input from "@components/common/Input";
import Button from "@components/common/Button";
import Modal from "@components/common/Modal";
import ConfirmContent from "@components/content/ConfirmContent";
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
    const {userInfo, setUserInfo} = useUserInfoStore();
    const {userData, setUserData} = useUserDataStore();
    const {showToast} = useToastStore();
    const {isLoading, errorText, sendRequest, clearError} = useRequest();
    const {updateAccountSchema} = UserSchemaProvider();

    const yearCategories = [
        {label: inputCategories.first[lang], value: "1", id: "select-1"},
        {label: inputCategories.second[lang], value: "2", id: "select-2"},
        {label: inputCategories.third[lang], value: "3", id: "select-3"},
        {label: inputCategories.fourth[lang], value: "4", id: "select-4"},
        {label: inputCategories.fifth[lang], value: "5", id: "select-5"},
    ];

    const fetchUser = useCallback(async () => {
        if (userInfo && userData) {
            try {
                const response = await sendRequest({
                    url: "/users",
                    method: "get",
                });
                const {userId, username, email, year, studentId, studio, passQuiz, countOfLaserPerWeek, countOfLaserPerDay, countOfWarning, tel, role} = response.data;
                setUserData({year, studio, passQuiz, countOfLaserPerWeek, countOfLaserPerDay, countOfWarning, tel, role});
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

    type UpdateAccountFormData = z.infer<typeof updateAccountSchema>;

    const {register, handleSubmit, formState: {errors}, reset} = useForm<UpdateAccountFormData>({
        resolver: zodResolver(updateAccountSchema),
        defaultValues: {
            username: "",
            year: "1",
            studentId: "",
            studio: "",
            tel: "",
        }
    });

    useEffect(() => {
        if (userInfo && userData) {
            reset({
                username: userInfo.username,
                year: userData?.year,
                studentId: userInfo?.studentId,
                studio: userData?.studio,
                tel: userData?.tel,
            });
        }
    }, [userInfo, userData, reset]);

    // 에러 메시지
    useEffect(() => {
        if (errorText) showToast(errorText, "error");
        const errorTimer = setTimeout(() => clearError(), 6000);
        return () => clearTimeout(errorTimer);
    }, [errorText]);

    // 내 정보 변경 버튼 클릭 시, 유효성 검사 및 confirm 모달 보이기
    const submitHandler: SubmitHandler<UpdateAccountFormData> = (data) => {
        setFormData(data);
        setUpdateAccountModal(true);
    };

    // confirm 모달에서 수정하기 클릭 시, 수정 요청보내기
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
        <ConfirmContent
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
            <HeadTag title={headerCategories.profileUpdate[lang]}/>

            <Header leftChild={<ArrowBack/>} centerText={headerCategories.profileUpdate[lang]}/>
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

                        <Select
                            categories={yearCategories}
                            label={inputCategories.year[lang]}
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
                            subLabel={inputCategories.inputKorean[lang]}
                            type={"text"}
                            id={"studio"}
                            name={"studio"}
                            placeholder={placeholderCategories.studio[lang]}
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

                        <Button
                            type={"submit"}
                            content={buttonCategories.profileUpdate[lang]}
                            width={"full"}
                            color={"primary"}
                            scale={"big"}
                        />
                    </form>

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