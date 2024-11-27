import React, {useCallback, useEffect, useState} from "react";
import {Modal} from "@components/common/Modal";
import UserInfoCard from "@components/common/UserInfoCard";
import Button from "@components/common/Button";
import ModalConfirmContent from "@components/common/Modal/ConfirmModal.tsx";
import useRequest from "@hooks/useRequest.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {useToastStore} from "@store/useToastStore.ts";
import { Container } from "./style.ts";
import {IUserInfo} from "@/types/user.ts";
import {cardCategories} from "@constants/cardCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {messageCategories} from "@constants/messageCategories.ts";


const UserListItem = (
    {
        userList,
        setUserList,
        ...props
    }: IUserInfo & {userList: IUserInfo[], setUserList: React.Dispatch<React.SetStateAction<IUserInfo[]>>}
) => {
    const [userInfo, setUserInfo] = useState<IUserInfo>(props);
    const [showUserInfoModal, setShowUserInfoModal] = useState<boolean>(false);
    const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState<boolean>(false);

    const {lang} = useThemeStore();
    const {showToast} = useToastStore();
    const {sendRequest, errorText, clearError} = useRequest();

    // 유저 정보 받아 유저 정보 업데이트하기
    const userInfoUpdateHandler = (updatedUser: IUserInfo) => {
        setUserInfo(updatedUser);
    };

    // 유저 삭제 확인 모달 띄우기
    const deleteConfirmHandler = (e: MouseEvent) => {
        e.stopPropagation();
        setShowDeleteConfirmModal(true);
    };

    // 유저 삭제하기
    const deleteUser = useCallback(async () => {
        try {
            const response = await sendRequest({
                url: `/users/${userInfo?.userId}`,
                method: "delete",
            });
            if (response.data) {
                // 유저 목록에서 삭제된 유저 제거
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
    }, [sendRequest, userInfo]);

    // 에러 메시지
    useEffect(() => {
        if (errorText) showToast(errorText, "error");
        const errorTimer = setTimeout(() => clearError(), 6000);
        return () => clearTimeout(errorTimer);
    }, [errorText]);


    // 유저 삭제 확인 모달 내용
    const DeleteConfirmModalContent = () => (
        <ModalConfirmContent
            text={messageCategories.delete[lang]}
            leftBtn={<Button
                type={"button"}
                content={buttonCategories.cancel[lang]}
                width={"full"}
                color={"third"}
                scale={"normal"}
                onClick={() => setShowDeleteConfirmModal(false)}
            />}
            rightBtn={<Button
                type={"button"}
                content={buttonCategories.deletion[lang]}
                width={"full"}
                color={"danger"}
                scale={"normal"}
                onClick={deleteUser}
            />}
        />
    );

    return (
        <>
            <Container
                pass={userInfo.passEducation}
                onClick={() => setShowUserInfoModal(true)}
            >
                <span>{userInfo.username}</span>
                <span>{userInfo.year}</span>
                <span>{userInfo.countOfWarning}</span>
                <div>
                    <span>{userInfo.passEducation ? cardCategories.pass[lang] : cardCategories.fail[lang]}</span>
                </div>
                <Button
                    type={"button"}
                    content={buttonCategories.delete[lang]}
                    width={"fit"}
                    color={"second"}
                    scale={"small"}
                    onClick={deleteConfirmHandler}
                />
            </Container>

            {showUserInfoModal && props.userId && (
                <Modal
                    content={
                        <UserInfoCard
                            userId={props.userId}
                            setModal={setShowUserInfoModal}
                            onUserInfoUpdate={userInfoUpdateHandler}
                            userList={userList}
                            setUserList={setUserList}
                            setShowUserInfoModal={setShowUserInfoModal}
                        />
                    }
                    setModal={setShowUserInfoModal}
                    type={"popup"}
                />
            )}

            {showDeleteConfirmModal && props.userId && (
                <Modal
                    content={<DeleteConfirmModalContent/>}
                    setModal={setShowDeleteConfirmModal}
                    type={"popup"}
                />
            )}
        </>
    );
};

export default UserListItem;
