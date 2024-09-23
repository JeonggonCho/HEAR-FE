import {FC, useState} from "react";

import Modal from "@components/Modal";
import UserInfoContent from "@components/UserInfoContent";
import {IUserList} from "@/types/user.ts";

import {Container} from "./style.ts";

const UserListItem:FC<IUserList> = (props) => {
    const [showUserInfoModal, setShowUserInfoModal] = useState<boolean>(false);

    const {userId, username, year, studentId, countOfWarning, passQuiz} = props;

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

            {showUserInfoModal && userId &&
              <Modal
                content={<UserInfoContent userId={userId} setModal={setShowUserInfoModal}/>}
                setModal={setShowUserInfoModal}
                type={"popup"}
              />
            }
        </Container>
    );
};

export default UserListItem;