import React, {useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {ReactSVG} from "react-svg";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import Button from "@components/common/Button";
import Input from "@components/common/Input";
import {Modal} from "@components/common/Modal";
import ModalConfirmContent from "@components/common/Modal/ConfirmModal.tsx";
import ProfileImage from "@components/common/ProfileImage";
import useRequest from "@hooks/useRequest.ts";
import useAuth from "@hooks/useAuth.ts";
import WarningSchemaProvider from "@schemata/WarningSchemaProvider.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {useToastStore} from "@store/useToastStore.ts";
import {Buttons, CloseButton, Container, FieldWrapper, PassTag, PassWrapper, WarningWrapper} from "./style.ts";
import {IUserInfo} from "@/types/user.ts";
import {cardCategories} from "@constants/cardCategories.ts";
import {inputCategories} from "@constants/inputCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {placeholderCategories} from "@constants/placeholderCategories.ts";
import {messageCategories} from "@constants/messageCategories.ts";
import close from "@assets/icons/close.svg";


interface IUserInfoContentProps {
    userId: string;
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    onUserInfoUpdate?: (updatedUser: IUserInfo) => void;
    userList: IUserInfo[];
    setUserList: React.Dispatch<React.SetStateAction<IUserInfo[]>>;
    setShowUserInfoModal: React.Dispatch<React.SetStateAction<boolean>>;
}


const UserInfoCard = (
    {
        userId,
        setModal,
        onUserInfoUpdate,
        userList,
        setUserList,
        setShowUserInfoModal
    }: IUserInfoContentProps
) => {
    const [user, setUser] = useState<IUserInfo>();
    const [showWarning, setShowWarning] = useState<boolean>(false);
    const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState<boolean>(false);
    const [showHandoverConfirmModal, setShowHandoverConfirmModal] = useState<boolean>(false);

    const navigate = useNavigate();

    const {lang} = useThemeStore();
    const {showToast} = useToastStore();
    const {logout} = useAuth();
    const {isLoading, errorText, sendRequest, clearError} = useRequest();
    const {warningSchema} = WarningSchemaProvider();

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
        if (isLoading) return;
        try {
            const response = await sendRequest({
                url: `/users/warning/add/${userId}`,
                method: "patch",
                data: {...data, countOfWarning: user?.countOfWarning},
            });
            if (response.data) {
                const updatedUser = {...user, countOfWarning: response.data.countOfWarning as number};
                setUser(updatedUser as IUserInfo);
                onUserInfoUpdate && onUserInfoUpdate(updatedUser as IUserInfo);
            }
        } catch (err) {
            console.error("경고 부과 중 에러 발생: ", err);
        } finally {
            setShowWarning(false);
            reset({message: "",});
        }
    }, [isLoading, sendRequest, userId, user, onUserInfoUpdate]);

    // 경고 차감하기
    const handleMinusWarning = useCallback(async () => {
        if (isLoading) return;
        try {
            const response = await sendRequest({
                url: `/users/warning/minus/${userId}`,
                method: "patch",
                data: {countOfWarning: user?.countOfWarning},
            });
            if (response.data) {
                const updatedUser = {...user, countOfWarning: response.data.countOfWarning as number};
                setUser(updatedUser as IUserInfo);
                onUserInfoUpdate && onUserInfoUpdate(updatedUser as IUserInfo);
            }
        } catch (err) {
            console.error("경고 차감 중 에러 발생: ", err);
        } finally {
            setShowWarning(false);
        }
    }, [isLoading, sendRequest, userId, user, onUserInfoUpdate]);

    // 교육 이수 처리하기
    const handlePassEducation = useCallback(async () => {
        if (isLoading) return;
        if (user?.passEducation === true) {
            console.error("이미 교육 이수가 완료된 상태입니다.");
            return;
        }
        try {
            const response = await sendRequest({
                url: `/users/education/pass/${userId}`,
                method: "patch",
                data: {passEducation: false},
            });
            if (response.data.passEducation === true) {
                const updatedUser = {...user, passEducation: response.data.passEducation as boolean};
                setUser(updatedUser as IUserInfo);
                onUserInfoUpdate && onUserInfoUpdate(updatedUser as IUserInfo);
            }
        } catch (err) {
            console.error("교육 이수 처리 중 에러 발생: ", err);
        }
    }, [isLoading, sendRequest, userId, user, onUserInfoUpdate]);

    // 교육 미이수 처리하기
    const handleResetEducation = useCallback(async () => {
        if (isLoading) return;
        if (user?.passEducation === false) {
            console.error("이미 교육 미이수가 완료된 상태입니다.");
            return;
        }
        try {
            const response = await sendRequest({
                url: `/users/education/reset/${userId}`,
                method: "patch",
                data: {passEducation: true},
            });
            if (response.data.passEducation === false) {
                const updatedUser = {...user, passEducation: response.data.passEducation as boolean};
                setUser(updatedUser as IUserInfo);
                onUserInfoUpdate && onUserInfoUpdate(updatedUser as IUserInfo);
            }
        } catch (err) {
            console.error("교육 미이수 처리 중 에러 발생: ", err);
        }
    }, [isLoading, sendRequest, userId, user, onUserInfoUpdate]);

    // 에러 메시지
    useEffect(() => {
        if (errorText) showToast(errorText, "error");
        const errorTimer = setTimeout(() => clearError(), 6000);
        return () => clearTimeout(errorTimer);
    }, [errorText]);

    // 유저 삭제 확인 모달 띄우기
    const deleteConfirmHandler = () => {
        setShowDeleteConfirmModal(true);
    };

    // 유저 삭제하기
    const deleteUser = useCallback(async () => {
        try {
            const response = await sendRequest({
                url: `/users/${userId}`,
                method: "delete",
            });
            if (response.data) {
                const remainedUsers = userList.filter(user => user.userId.toString() !== response.data.deletedUserId.toString());
                setUserList(remainedUsers);
                showToast(messageCategories.deleteUserDone[lang], "success");
                setShowUserInfoModal(false);
            }
        } catch (err) {
            console.error("유저 삭제 중 에러 발생: ", err);
        } finally {
            setShowDeleteConfirmModal(false);
        }
    }, [sendRequest, user]);

    // 유저 조교 인수인계 확인 모달 띄우기
    const handoverConfirmHandler = () => {
        setShowHandoverConfirmModal(true);
    };

    // 조교 역할 인수인계 하기
    const handoverAssistant = useCallback(async () => {
        try {
            const response = await sendRequest({
                url: `/users/handover-assistant/${userId}`,
                method: "patch",
                data: {},
            });
            if (response.data) {
                showToast(messageCategories.handoverDone[lang], "success");
                logout();
                navigate("/login", {replace: true});
            }
        } catch (err) {
            console.error("조교 역할 인수 인계 중 에러 발생: ", err);
        } finally {
            setShowHandoverConfirmModal(false);
        }
    }, [sendRequest, user]);


    // 유저 삭제 확인 모달 내용
    const DeleteConfirmModalContent = () => (
        <ModalConfirmContent
            text={messageCategories.delete[lang]}
            leftBtn={<Button
                type={"button"}
                content={buttonCategories.cancel[lang]}
                scale={"normal"}
                color={"third"}
                width={"full"}
                onClick={() => setShowDeleteConfirmModal(false)}
            />}
            rightBtn={<Button
                type={"button"}
                content={buttonCategories.deletion[lang]}
                scale={"normal"}
                color={"danger"}
                width={"full"}
                onClick={deleteUser}
            />}
        />
    );

    // 유저 조교 인수인계 확인 모달 내용
    const HandoverConfirmModalContent = () => (
        <ModalConfirmContent
            text={messageCategories.handover[lang]}
            description={messageCategories.warningHandover[lang]}
            leftBtn={<Button
                type={"button"}
                content={buttonCategories.cancel[lang]}
                color={"third"}
                scale={"normal"}
                width={"full"}
                onClick={() => setShowHandoverConfirmModal(false)}
            />}
            rightBtn={<Button
                type={"button"}
                content={buttonCategories.handover[lang]}
                color={"danger"}
                scale={"normal"}
                width={"full"}
                onClick={handoverAssistant}
            />}
        />
    );


    return (
        <Container>
            {user &&
                <>
                  <CloseButton onClick={(e) => {
                      e.stopPropagation();
                      setModal(false)
                  }}>
                    <ReactSVG src={close}/>
                  </CloseButton>

                  <ProfileImage size={72}/>

                  <h3>{user?.username}</h3>

                  <div>
                    <FieldWrapper>
                      <div>{inputCategories.year[lang]}</div>
                      <span>{user?.year}</span>
                    </FieldWrapper>

                    <FieldWrapper>
                      <div>{inputCategories.studentId[lang]}</div>
                      <span>{user?.studentId}</span>
                    </FieldWrapper>

                    <FieldWrapper>
                      <div>{cardCategories.email[lang]}</div>
                      <span>{user?.email}</span>
                    </FieldWrapper>

                    <FieldWrapper>
                      <div>{inputCategories.tel[lang]}</div>
                      <span>{user?.tel}</span>
                    </FieldWrapper>

                    <FieldWrapper>
                      <div>{cardCategories.studio[lang]}</div>
                      <span>{user?.studio}</span>
                    </FieldWrapper>

                    <WarningWrapper>
                      <div>{inputCategories.warning[lang]}</div>
                        {showWarning ?
                            <form onSubmit={handleSubmit(handleAddWarning)}>
                                <Input
                                    type={"text"}
                                    id={"warning-message"}
                                    name={"message"}
                                    register={register}
                                    placeholder={placeholderCategories.reason[lang]}
                                    errorMessage={errors.message?.message}
                                />
                                <div>
                                    <Button
                                        type={"button"}
                                        content={buttonCategories.cancel[lang]}
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
                                        content={buttonCategories.imposition[lang]}
                                        width={"full"}
                                        color={"danger"}
                                        scale={"small"}
                                    />
                                </div>
                            </form>
                            :
                            <div>
                                <span>{user?.countOfWarning}</span>
                                <Buttons>
                                    {(user?.countOfWarning > 0) &&
                                      <Button
                                        type={"button"}
                                        content={buttonCategories.deduction[lang]}
                                        width={"fit"}
                                        color={"third"}
                                        scale={"small"}
                                        onClick={handleMinusWarning}
                                      />
                                    }
                                    {(user?.countOfWarning < 2) &&
                                      <Button
                                        type={"button"}
                                        content={buttonCategories.imposition[lang]}
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
                      <div>{inputCategories.status[lang]}</div>
                      <div>
                        <PassTag
                          pass={user?.passEducation || false}
                        >
                            {user?.passEducation ? cardCategories.pass[lang] : cardCategories.fail[lang]}
                        </PassTag>
                        <Buttons>
                            {!user?.passEducation && (
                                <Button
                                    type={"button"}
                                    content={buttonCategories.pass[lang]}
                                    width={"fit"}
                                    color={"third"}
                                    scale={"small"}
                                    onClick={handlePassEducation}
                                />
                            )}
                            {user?.passEducation && (
                                <Button
                                    type={"button"}
                                    content={buttonCategories.fail[lang]}
                                    width={"fit"}
                                    color={"third"}
                                    scale={"small"}
                                    onClick={handleResetEducation}
                                />
                            )}
                        </Buttons>
                      </div>
                    </PassWrapper>
                  </div>

                  <Buttons>
                    <Button
                      type={"button"}
                      content={buttonCategories.deletion[lang]}
                      width={"full"}
                      color={"second"}
                      scale={"small"}
                      onClick={deleteConfirmHandler}
                    />
                    <Button
                      type={"button"}
                      content={buttonCategories.handover[lang]}
                      width={"full"}
                      color={"second"}
                      scale={"small"}
                      onClick={handoverConfirmHandler}
                    />
                  </Buttons>
                </>
            }

            {showDeleteConfirmModal &&
                <Modal
                  content={<DeleteConfirmModalContent/>}
                  setModal={setShowDeleteConfirmModal}
                  type={"popup"}
                />
            }

            {showHandoverConfirmModal &&
                <Modal
                  content={<HandoverConfirmModalContent/>}
                  setModal={setShowHandoverConfirmModal}
                  type={"popup"}
                />
            }
        </Container>
    );
};

export default UserInfoCard;