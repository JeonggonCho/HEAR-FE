import {FC, useState} from "react";

import {Container} from "./style.ts";
import Modal from "@components/Modal";

const UserListItem:FC = (props) => {
    const [showUser, setShowUser] = useState<boolean>(false);

    return (
        <Container
            passQuiz={true}
            onClick={() => {
                setShowUser(true)
            }}
        >
            <span>{props.name}</span>
            <span>{props.year}</span>
            <span>{props.studentId}</span>
            <span>0</span>
            <div>
                <span>이수</span>
            </div>

            {showUser &&
              <Modal
                content={<></>}
                setModal={setShowUser}
                type={"popup"}
              />
            }
        </Container>
    );
};

export default UserListItem;