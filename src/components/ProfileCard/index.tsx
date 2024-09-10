import {FC} from "react";

import {useUserInfoStore, useUserDataStore} from "@store/useUserStore.ts";

import {Container} from "./style.ts";

const ProfileCard:FC = () => {
    const {userInfo} = useUserInfoStore();
    const {userData} = useUserDataStore();

    return (
        <Container>
            <div>
                <span>아이디</span>
                <span>{userInfo?.email}</span>
            </div>
            <div>
                <span>학 번</span>
                <span>{userInfo?.studentId}</span>
            </div>
            <div>
                <span>학 년</span>
                <span>{userData?.year}학년</span>
            </div>
            <div>
                <span>스튜디오</span>
                <span>{userData?.studio} 교수님</span>
            </div>
        </Container>
    );
};

export default ProfileCard;