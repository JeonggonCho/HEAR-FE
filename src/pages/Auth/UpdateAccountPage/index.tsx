import {useEffect, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {z} from "zod";
import {useNavigate} from "react-router-dom";

import Header from "@components/Header";
import ArrowBack from "@components/ArrowBack";
import Select from "@components/Select";
import InputWithLabel from "@components/InputWithLabel";
import ColoredBtn from "@components/ColoredBtn";
import Modal from "@components/Modal";
import ConfirmContent from "@components/ConfirmContent";
import LoadingLoop from "@components/LoadingLoop";

import {yearCategories} from "@constants/yearCategories.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import useRequest from "@hooks/useRequest.ts";
import {updateAccountSchema} from "@schemata/authSchema.ts";
import {useUserDataStore} from "@store/useUserStore.ts";

import {Container} from "./style.ts";


const UpdateAccountPage = () => {
    const [formData, setFormData] = useState<any>(null);
    const [updateAccountModal, setUpdateAccountModal] = useState<boolean>(false);

    const {userData, setUserData} = useUserDataStore();
    const {isLoading, errorText, sendRequest, clearError} = useRequest();

    const navigate = useNavigate();

    // 유저 데이터 조회
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await sendRequest({
                    url: "/users",
                    method: "get",
                });
                const {year, studio, passQuiz, countOfLaser, countOfWarning, tel} = response.data;
                setUserData({year, studio, passQuiz, countOfLaser, countOfWarning, tel});
            } catch (err) {
                console.error("유저 정보 조회 에러: ", err);
            }
        };
        fetchUser();
    }, [sendRequest]);

    type UpdateAccountFormData = z.infer<typeof updateAccountSchema>;

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: zodResolver(updateAccountSchema),
        defaultValues: {
            year: userData?.year ?? "1",
            studio: userData?.studio ?? "",
            tel: userData?.tel ?? "",
        }
    });

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
                navigate("/account");
            } catch (err) {
                setUpdateAccountModal(false);
                console.error("정보 수정 에러: ", err);
            }
        }
    };

    const UpdateAccountContent = () => {
        const leftBtn = (
            <ColoredBtn
                type={"button"}
                content={"닫기"}
                width={"full"}
                color={"third"}
                scale={"normal"}
                onClick={() => {setUpdateAccountModal(false)}}
            />
        );
        const rightBtn = (
            <ColoredBtn
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
            <Header leftChild={<ArrowBack/>} centerText={"내 정보 수정"}/>
            {isLoading ?
                <LoadingLoop/>
                :
                <>
                    <form onSubmit={handleSubmit(submitHandler)}>
                        <Select
                            categories={yearCategories}
                            label={"학 년"}
                            name={"year"}
                            register={register}
                            errorMessage={errors.year?.message}
                        />

                        <InputWithLabel
                            label={"스튜디오"}
                            type={"text"}
                            id={"studio"}
                            name={"studio"}
                            placeholder={"스튜디오 교수님 이름을 입력해주세요"}
                            register={register}
                            errorMessage={errors.studio?.message}
                        />

                        <InputWithLabel
                            label={"전화번호"}
                            type={"tel"}
                            placeholder={"전화번호를 입력해주세요"}
                            id={"tel"}
                            name={"tel"}
                            register={register}
                            errorMessage={errors.tel?.message}
                        />

                        <ColoredBtn
                            type={"submit"}
                            content={"내 정보 수정"}
                            width={"full"}
                            color={"primary"}
                            scale={"big"}
                        />
                    </form>

                    {updateAccountModal &&
                      <Modal
                        content={<UpdateAccountContent/>}
                        setModal={setUpdateAccountModal}
                        type={"popup"}
                      />
                    }
                </>
            }

            {errorText &&
              <Modal
                content={<div>{errorText}</div>}
                setModal={clearError}
                type={"popup"}
              />
            }
        </Container>
    );
};

export default UpdateAccountPage;