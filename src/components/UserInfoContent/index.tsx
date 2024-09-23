import {FC, useCallback, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {ReactSVG} from "react-svg";
import {z} from "zod";

import Button from "@components/Button";
import Input from "@components/Input";
import Toast from "@components/Toast";

import useRequest from "@hooks/useRequest.ts";
import {IUserInfoContentProps} from "@/types/componentProps.ts";
import {IUserInfo} from "@/types/user.ts";
import {warningSchema} from "@schemata/warningSchema.ts";

import {Buttons, CloseButton, Container, FieldWrapper, PassTag, PassWrapper, WarningWrapper} from "./style.ts";

import userIcon from "@assets/images/no_profile.png";
import close from "@assets/icons/close.svg";

const UserInfoContent:FC<IUserInfoContentProps> = ({userId, setModal}) => {
    const [user, setUser] = useState<IUserInfo>();
    const [showWarning, setShowWarning] = useState<boolean>(false);

    const {isLoading, errorText, sendRequest, clearError} = useRequest();

    type WarningFormData = z.infer<typeof warningSchema>;

    const {register, handleSubmit, formState:{errors}, reset} = useForm<WarningFormData>({
        resolver: zodResolver(warningSchema),
        defaultValues: {
            message: "",
        },
    });

    // 유저 정보 요청하기
    const fetchUser = useCallback(async () => {
        try {
            const response = await sendRequest({
                url: `/users/${userId}`
            });
            setUser(response.data);
        } catch (err) {
            console.error("유저 정보 요청 중 에러 발생: ", err);
        }
    }, [sendRequest, userId]);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    // 경고 사유 인풋 띄우기
    const handleShowWarning = () => {
        setShowWarning(true);
    };

    // 경고 부과하기
    const handleAddWarning = useCallback(async (data: WarningFormData) => {
        try {
            const response = await sendRequest({
                url: `/users/warning/add/${userId}`,
                method: "patch",
                data: {...data, countOfWarning: user?.countOfWarning},
            });
            if (response.data) {
                setUser((prevState) => {
                    if (!prevState) return prevState;
                    return {...prevState, countOfWarning: response.data};
                });
            }
        } catch (err) {
            console.error("경고 차감 중 에러 발생: ", err);
        }
    }, [sendRequest, userId]);

    // 경고 차감하기
    const handleMinusWarning = useCallback(async () => {
        try {
            const response = await sendRequest({
                url: `/users/warning/minus/${userId}`,
                method: "patch",
                data: {countOfWarning: user?.countOfWarning},
            });
            if (response.data) {
                setUser((prevState) => {
                    if (!prevState) return prevState;
                    return {...prevState, countOfWarning: response.data};
                });
            }
        } catch (err) {
            console.error("경고 부과 중 에러 발생: ", err);
        }
    }, [sendRequest, userId]);

    // 교육 이수 처리하기
    const handlePassQuiz = useCallback(async () => {
        try {
            const response = await sendRequest({
                url: `/users/quiz/pass/${userId}`,
                method: "patch",
                data: {passQuiz: user?.passQuiz},
            });
            if (response.data) {
                setUser((prevState) => {
                    if (!prevState) return prevState;
                    return {...prevState, passQuiz: response.data};
                });
            }
        } catch (err) {
            console.error("교육 이수 처리 중 에러 발생: ", err);
        }
    }, [sendRequest, userId]);

    // 교육 미이수 처리하기
    const handleResetPassQuiz = useCallback(async () => {
        try {
            const response = await sendRequest({
                url: `/users/quiz/reset/${userId}`,
                method: "patch",
                data: {passQuiz: user?.passQuiz},
            });
            if (response.data) {
                setUser((prevState) => {
                    if (!prevState) return prevState;
                    return {...prevState, passQuiz: response.data};
                });
            }
        } catch (err) {
            console.error("교육 미이수 처리 중 에러 발생: ", err);
        }
    }, [sendRequest, userId]);

    return (
        <Container>
            {(isLoading || !user) ?
                <div>로딩중...</div>
                :
                <>
                    <CloseButton onClick={(e) => {
                        e.stopPropagation();
                        setModal(false)
                    }}>
                        <ReactSVG src={close}/>
                    </CloseButton>

                    <div>
                        <img src={userIcon} alt={"no_profile"}/>
                    </div>

                    <h3>{user?.username}</h3>

                    <div>
                        <FieldWrapper>
                            <div>학 년</div>
                            <span>{user?.year}학년</span>
                        </FieldWrapper>

                        <FieldWrapper>
                            <div>학 번</div>
                            <span>{user?.studentId}</span>
                        </FieldWrapper>

                        <FieldWrapper>
                            <div>이메일</div>
                            <span>{user?.email}</span>
                        </FieldWrapper>

                        <FieldWrapper>
                            <div>전화번호</div>
                            <span>{user?.tel}</span>
                        </FieldWrapper>

                        <WarningWrapper>
                            <div>경 고</div>
                            {showWarning ?
                                <form onSubmit={handleSubmit(handleAddWarning)}>
                                    <Input
                                        type={"text"}
                                        id={"warning-message"}
                                        name={"message"}
                                        register={register}
                                        placeholder={"경고 사유 입력"}
                                        errorMessage={errors.message?.message}
                                    />
                                    <div>
                                        <Button
                                            type={"button"}
                                            content={"취소"}
                                            width={"full"}
                                            color={"third"}
                                            scale={"small"}
                                            onClick={() => {
                                                setShowWarning(false);
                                                reset({message: "",});
                                            }}
                                        />
                                        <Button
                                            type={"submit"}
                                            content={"경고 부과"}
                                            width={"full"}
                                            color={"danger"}
                                            scale={"small"}
                                        />
                                    </div>
                                </form>
                                :
                                <div>
                                    <span>{user?.countOfWarning} 회</span>
                                    <Buttons>
                                        {(user?.countOfWarning > 0) &&
                                          <Button
                                            type={"button"}
                                            content={"차감"}
                                            width={"fit"}
                                            color={"third"}
                                            scale={"small"}
                                            onClick={handleMinusWarning}
                                          />
                                        }
                                        {(user?.countOfWarning < 2) &&
                                          <Button
                                            type={"button"}
                                            content={"부과"}
                                            width={"fit"}
                                            color={"danger"}
                                            scale={"small"}
                                            onClick={handleShowWarning}
                                          />
                                        }
                                    </Buttons>
                                </div>
                            }
                        </WarningWrapper>

                        <PassWrapper>
                            <div>교 육</div>
                            <div>
                                <PassTag pass={user?.passQuiz || false}>{user?.passQuiz ? "이수" : "미이수"}</PassTag>
                                <Buttons>
                                    {user?.passQuiz ?
                                        <Button
                                            type={"button"}
                                            content={"미이수 처리"}
                                            width={"fit"}
                                            color={"third"}
                                            scale={"small"}
                                            onClick={handleResetPassQuiz}
                                        />
                                        :
                                        <Button
                                            type={"button"}
                                            content={"이수 처리"}
                                            width={"fit"}
                                            color={"third"}
                                            scale={"small"}
                                            onClick={handlePassQuiz}
                                        />
                                    }
                                </Buttons>
                            </div>
                        </PassWrapper>
                    </div>
                </>
            }

            {errorText &&
              <Toast
                text={errorText}
                setToast={clearError}
                time={5000}/>
            }
        </Container>
    );
};

export default UserInfoContent;