import {FC, useState} from "react";

import Modal from "@components/Modal";
import UserInfoContent from "@components/UserInfoContent";
import {IUserInfo} from "@/types/user.ts";

import {Container} from "./style.ts";

const UserListItem:FC<IUserInfo> = (props) => {
    const [showUserInfoModal, setShowUserInfoModal] = useState<boolean>(false);

    const {username, year, studentId, countOfWarning, passQuiz} = props;

    return (
        <Container
            pass={passQuiz}
            onClick={() => setShowUserInfoModal(true)}
        >
            <span>{username}</span>
            <span>{year}</span>
            <span>{studentId}</span>
            <span>{countOfWarning}</span>
            <div>
                <span>{passQuiz ? "이수" : "미이수"}</span>
            </div>

            {showUserInfoModal &&
              <Modal
                content={<UserInfoContent setModal={setShowUserInfoModal} {...props}/>}
                setModal={setShowUserInfoModal}
                type={"popup"}
              />
            }
        </Container>
    );
};

export default UserListItem;