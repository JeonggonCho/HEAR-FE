import {FC} from "react";
import {Container} from "./style.ts";
import {useUserDataStore} from "@store/useUserStore.ts";

const StatusCard:FC = () => {
    const {userData} = useUserDataStore();

    return (
        <Container>
            <div>
                <p>교육 이수</p>
                <span>(미이수 시, 사용제한)</span>
                <h3>{userData?.passQuiz ? "이수 완료" : "미이수"}</h3>
            </div>
            <div/>
            <div>
                <p>경 고</p>
                <span>(2회 시, 사용제한)</span>
                <h3>{typeof userData?.countOfWarning === "number" && userData.countOfWarning > 0 ? userData.countOfWarning : 0}번</h3>
            </div>
        </Container>
    );
};

export default StatusCard;