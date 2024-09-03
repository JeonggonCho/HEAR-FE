import {FC} from "react";
import {Container} from "./style.ts";
import {useUserStore} from "@store/useUserStore.ts";

const StatusCard:FC = () => {
    const {user} = useUserStore();

    return (
        <Container>
            <div>
                <p>교육 이수</p>
                <span>(미이수 시, 사용제한)</span>
                <h3>{user?.passQuiz ? "이수 완료" : "미이수"}</h3>
            </div>
            <div/>
            <div>
                <p>경 고</p>
                <span>(2회 시, 사용제한)</span>
                <h3>{typeof user?.warning === "number" && user.warning > 0 ? user.warning : 0}번</h3>
            </div>
        </Container>
    );
};

export default StatusCard;