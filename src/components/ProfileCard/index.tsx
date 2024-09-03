import {FC} from "react";
import {Container} from "./style.ts";
import {useUserStore} from "@store/useUserStore.ts";

const ProfileCard:FC = () => {
    const {user} = useUserStore();

    return (
        <Container>
            <div>
                <span>아이디</span>
                <span>{user?.email}</span>
            </div>
            <div>
                <span>학 번</span>
                <span>{user?.studentId}</span>
            </div>
            <div>
                <span>학 년</span>
                <span>{user?.year}</span>
            </div>
            <div>
                <span>스튜디오</span>
                <span>{user?.studio} 교수님</span>
            </div>
        </Container>
    );
};

export default ProfileCard;