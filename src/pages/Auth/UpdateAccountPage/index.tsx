import {FC, useCallback, useEffect, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {z} from "zod";
import {useNavigate} from "react-router-dom";
import {zodResolver} from "@hookform/resolvers/zod";

import Header from "@components/common/Header";
import ArrowBack from "@components/common/ArrowBack";
import Select from "@components/common/Select";
import Input from "@components/common/Input";
import Button from "@components/common/Button";
import Modal from "@components/common/Modal";
import ConfirmContent from "@components/content/ConfirmContent";
import LoadingLoop from "@components/common/LoadingLoop";
import Toast from "@components/common/Toast";
import HeadTag from "@components/common/HeadTag";

import useRequest from "@hooks/useRequest.ts";
import {updateAccountSchema} from "@schemata/userSchema.ts";
import {useUserDataStore, useUserInfoStore} from "@store/useUserStore.ts";
import {placeholderCategories} from "@constants/placeholderCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {headerCategories} from "@constants/headerCategories.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {inputCategories} from "@constants/inputCategories.ts";

import {Container} from "./style.ts";

const UpdateAccountPage:FC = () => {
    const [formData, setFormData] = useState<any>(null);
    const [updateAccountModal, setUpdateAccountModal] = useState<boolean>(false);

    const {userInfo, setUserInfo} = useUserInfoStore();
    const {userData, setUserData} = useUserDataStore();
    const {lang} = useThemeStore();

    const yearCategories = [
        {label: inputCategories.first[lang], value: "1", id: "select-1"},
        {label: inputCategories.second[lang], value: "2", id: "select-2"},
        {label: inputCategories.third[lang], value: "3", id: "select-3"},
        {label: inputCategories.fourth[lang], value: "4", id: "select-4"},
        {label: inputCategories.fifth[lang], value: "5", id: "select-5"},
    ];

    const {isLoading, errorText, sendRequest, clearError} = useRequest();

    const navigate = useNavigate();

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

    // 내 정보 수정 버튼 클릭 시, 유효성 검사 및 confirm 모달 보이기
    const submitHandler: SubmitHandler<UpdateAccountFormData> = async (data) => {
        setFormData(data);
        setUpdateAccountModal(true);
    };

    // confirm 모달에서 수정하기 클릭 시, 수정 요청보내기
    const handleConfirmUpdate = async () => {
        if (formData) {
            try {
                await sendRequest({
                    url: "/users",
                    method: "patch",
                    data: formData,
                });
                navigate("/account", {replace: true});
            } catch (err) {
                setUpdateAccountModal(false);
                console.error("정보 수정 에러: ", err);
            }
        }
    };

    const UpdateAccountModalContent = () => {
        const leftBtn = (
            <Button
                type={"button"}
                content={"닫기"}
                width={"full"}
                color={"third"}
                scale={"normal"}
                onClick={() => {setUpdateAccountModal(false)}}
            />
        );
        const rightBtn = (
            <Button
                type={"submit"}
                content={"수정하기"}
                width={"full"}
                color={"approval"}
                scale={"normal"}
                onClick={handleConfirmUpdate}
            />
        );
        return (
            <ConfirmContent
                text={"회원정보를 수정하시겠습니까?"}
                leftBtn={leftBtn}
                rightBtn={rightBtn}
            />
        );
    };

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

            {errorText &&
                <Toast text={errorText} setToast={clearError}/>
            }
        </Container>
    );
};

export default UpdateAccountPage;