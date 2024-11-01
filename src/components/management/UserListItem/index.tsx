import {FC, useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import Modal from "@components/common/Modal";
import UserInfoContent from "@components/content/UserInfoContent";
import Button from "@components/common/Button";
import ConfirmContent from "@components/content/ConfirmContent";

import useRequest from "@hooks/useRequest.ts";
import useAuth from "@hooks/useAuth.ts";
import { IUserInfo, IUserList } from "@/types/user.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {useToastStore} from "@store/useToastStore.ts";
import {cardCategories} from "@constants/cardCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {messageCategories} from "@constants/messageCategories.ts";

import { Container } from "./style.ts";


const UserListItem: FC<IUserList> = (props) => {
    const [userInfo, setUserInfo] = useState<IUserInfo | null>(null);
    const [showUserInfoModal, setShowUserInfoModal] = useState<boolean>(false);
    const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState<boolean>(false);

    const navigate = useNavigate();

    const {lang} = useThemeStore();
    const {showToast} = useToastStore();
    const {logout} = useAuth();
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
                showToast(messageCategories.deleteUserDone[lang], "success");
                logout();
                navigate("/login", {replace: true});
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

    const renderContainer = () => {
        const currentUserInfo = userInfo || props;

        return (
            <Container
                pass={currentUserInfo.passQuiz}
                onClick={() => setShowUserInfoModal(true)}
            >
                <span>{currentUserInfo.username}</span>
                <span>{currentUserInfo.year}</span>
                <span>{currentUserInfo.countOfWarning}</span>
                <div>
                    <span>{currentUserInfo.passQuiz ? cardCategories.pass[lang] : cardCategories.fail[lang]}</span>
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
        );
    };

    // 유저 삭제 확인 모달 내용
    const DeleteConfirmModalContent = () => (
        <ConfirmContent
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
            {renderContainer()}

            {showUserInfoModal && props.userId && (
                <Modal
                    content={
                        <UserInfoContent
                            userId={props.userId}
                            setModal={setShowUserInfoModal}
                            onUserInfoUpdate={userInfoUpdateHandler}
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
