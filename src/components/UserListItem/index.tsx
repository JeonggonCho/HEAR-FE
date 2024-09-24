import { FC, useState } from "react";
import Modal from "@components/Modal";
import UserInfoContent from "@components/UserInfoContent";
import { IUserInfo, IUserList } from "@/types/user.ts";
import { Container } from "./style.ts";

const UserListItem: FC<IUserList> = (props) => {
    const [userInfo, setUserInfo] = useState<IUserInfo | null>(null);
    const [showUserInfoModal, setShowUserInfoModal] = useState<boolean>(false);

    const handleUserInfoUpdate = (updatedUser: IUserInfo) => {
        setUserInfo(updatedUser);
    };

    const renderContainer = () => {
        const currentUserInfo = userInfo || props;

        return (
            <Container
                pass={currentUserInfo.passQuiz}
                onClick={() => setShowUserInfoModal(true)}
            >
                <span>{currentUserInfo.username}</span>
                <span>{currentUserInfo.year}</span>
                <span>{currentUserInfo.studentId}</span>
                <span>{currentUserInfo.countOfWarning}</span>
                <div>
                    <span>{currentUserInfo.passQuiz ? "이수" : "미이수"}</span>
                </div>
            </Container>
        );
    };

    return (
        <>
            {renderContainer()}

            {showUserInfoModal && props.userId && (
                <Modal
                    content={
                        <UserInfoContent
                            userId={props.userId}
                            setModal={setShowUserInfoModal}
                            onUserInfoUpdate={handleUserInfoUpdate}
                        />
                    }
                    setModal={setShowUserInfoModal}
                    type={"popup"}
                />
            )}
        </>
    );
};

export default UserListItem;
