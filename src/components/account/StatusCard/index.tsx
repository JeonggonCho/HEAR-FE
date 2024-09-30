import {FC} from "react";

import {useUserDataStore} from "@store/useUserStore.ts";

import {Container, PassStatus, WarningStatus} from "./style.ts";

const StatusCard:FC = () => {
    const {userData} = useUserDataStore();

    return (
        <Container>
            <div>
                <p>교육 이수</p>
                <span>(미이수 시, 사용제한)</span>
                <PassStatus pass={userData?.passQuiz as boolean}>{userData?.passQuiz ? "이수 완료" : "미이수"}</PassStatus>
            </div>
            <div/>
            <div>
                <p>경 고</p>
                <span>(2회 시, 사용제한)</span>
                <WarningStatus warning={userData?.countOfWarning as number}>{typeof userData?.countOfWarning === "number" && userData.countOfWarning > 0 ? userData.countOfWarning : 0} 번</WarningStatus>
            </div>
        </Container>
    );
};

export default StatusCard;