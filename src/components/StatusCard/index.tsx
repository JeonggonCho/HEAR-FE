import {FC} from "react";
import {Container} from "./style.ts";

const StatusCard:FC = () => {
    return (
        <Container>
            <div>
                <p>교육 이수</p>
                <span>(미이수 시, 사용제한)</span>
                <h3>이수 완료</h3>
            </div>
            <div/>
            <div>
                <p>경 고</p>
                <span>(2회 시, 사용제한)</span>
                <h3>0번</h3>
            </div>
        </Container>
    );
};

export default StatusCard;