import {FC, useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {ReactSVG} from "react-svg";

import Button from "@components/Button";
import Input from "@components/Input";

import useRequest from "@hooks/useRequest.ts";
import {IUserInfoContentProps} from "@/types/componentProps.ts";

import {Buttons, Container, FieldWrapper, PassTag, WarningWrapper} from "./style.ts";

import userIcon from "@assets/images/no_profile.png";
import close from "@assets/icons/close.svg";
import Warning from "@pages/instructions/saw/Warning";

const UserInfoContent:FC<IUserInfoContentProps> = ({username, year, studentId, email, tel, countOfWarning, passQuiz, setModal}) => {
    const [warning, setWarning] = useState<number>(countOfWarning);
    const [pass, setPass] = useState<boolean>(passQuiz);
    const [showWarning, setShowWarning] = useState<boolean>(false);

    const {isLoading, errorText, sendRequest, clearError} = useRequest();

    const {register, handleSubmit, formState:{errors}} = useForm({
        resolver: zodResolver(),
        defaultValues: {
            message: "",
        },
    });

    // 경고 부과 모달 띄우기
    const handleShowWarning = () => {
        setShowWarning(true);
    };

    // 경고 부과하기
    const handleAddWarning = async () => {
        try {
            setWarning(prevState => prevState + 1);
        } catch (err) {
            console.error("경고 차감 중 에러 발생: ", err);
        }
    };

    // 경고 차감하기
    const handleMinusWarning = async () => {
        try {
            setWarning(prevState => prevState - 1);
        } catch (err) {
            console.error("경고 부과 중 에러 발생: ", err);
        }
    };

    // 교육 이수 처리하기
    const handlePassQuiz = async () => {
        try {
            setPass(true);
        } catch (err) {
            console.error("교육 이수 처리 중 에러 발생: ", err);
        }
    };

    // 교육 미이수 처리하기
    const handleResetPassQuiz = async () => {
        try {
            setPass(false);
        } catch (err) {
            console.error("교육 미이수 처리 중 에러 발생: ", err);
        }
    };

    return (
        <Container>
            <div onClick={(e) => {
                e.stopPropagation();
                setModal(false)
            }}>
                <ReactSVG src={close}/>
            </div>

            <div>
                <img src={userIcon} alt={"no_profile"}/>
            </div>

            <h3>{username}</h3>

            <div>
                <FieldWrapper>
                    <div>학 년</div>
                    <span>{year}학년</span>
                </FieldWrapper>

                <FieldWrapper>
                    <div>학 번</div>
                    <span>{studentId}</span>
                </FieldWrapper>

                <FieldWrapper>
                    <div>이메일</div>
                    <span>{email}</span>
                </FieldWrapper>

                <FieldWrapper>
                    <div>전화번호</div>
                    <span>{tel}</span>
                </FieldWrapper>

                <WarningWrapper>
                    <div>경 고</div>

                    <div>
                        <div>
                            <span>{warning} 회</span>
                            <Buttons>
                                <Button
                                    type={"button"}
                                    content={"차감"}
                                    width={"fit"}
                                    color={"third"}
                                    scale={"small"}
                                    onClick={handleMinusWarning}
                                />
                                <Button
                                    type={"button"}
                                    content={"부과"}
                                    width={"fit"}
                                    color={"danger"}
                                    scale={"small"}
                                    onClick={handleShowWarning}
                                />
                            </Buttons>
                        </div>

                        {showWarning &&
                          <form onSubmit={handleSubmit(handleAddWarning)}>
                            <Input
                              type={"text"}
                              id={"warning-message"}
                              name={"message"}
                              register={register}
                              placeholder={"경고 사유 입력"}
                              errorMessage={errors.message?.message}
                            />
                            <Button
                              type={"submit"}
                              content={"전송"}
                              width={"fit"}
                              color={"primary"}
                              scale={"small"}
                            />
                          </form>
                        }
                    </div>
                </WarningWrapper>

                <FieldWrapper>
                    <div>교 육</div>
                    <PassTag pass={pass}>{pass ? "이수" : "미이수"}</PassTag>
                    <Buttons>
                        {pass ?
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
                </FieldWrapper>
            </div>
        </Container>
    );
};

export default UserInfoContent;