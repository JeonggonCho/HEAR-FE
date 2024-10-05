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
import ErrorContent from "@components/content/ErrorContent";

import {yearCategories} from "@constants/yearCategories.ts";
import useRequest from "@hooks/useRequest.ts";
import {updateAccountSchema} from "@schemata/userSchema.ts";
import {useUserDataStore, useUserInfoStore} from "@store/useUserStore.ts";
import {buttonLabels, headerTitle, placeholders} from "@constants/langCategories.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {inputLabels} from "@constants/langCategories.ts";

import {Container} from "./style.ts";

const UpdateAccountPage:FC = () => {
    const [formData, setFormData] = useState<any>(null);
    const [updateAccountModal, setUpdateAccountModal] = useState<boolean>(false);

    const {userInfo, setUserInfo} = useUserInfoStore();
    const {userData, setUserData} = useUserDataStore();
    const {lang} = useThemeStore();

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
            <Header leftChild={<ArrowBack/>} centerText={headerTitle.profileUpdate[lang]}/>
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

                        <Select
                            categories={yearCategories}
                            label={inputLabels.year[lang]}
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
                            id={"studio"}
                            name={"studio"}
                            placeholder={placeholders.studio[lang]}
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

                        <Button
                            type={"submit"}
                            content={buttonLabels.profileUpdate[lang]}
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
                <Modal
                    content={<ErrorContent text={errorText} closeModal={clearError}/>}
                    setModal={clearError}
                    type={"popup"}
                />
            }
        </Container>
    );
};

export default UpdateAccountPage;