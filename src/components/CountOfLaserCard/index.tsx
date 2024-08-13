import {FC} from 'react';
import {Container} from "./style.ts";
import count from "../../assets/images/count.png";

const CountOfLaserCard:FC = () => {
    return (
        <Container>
            <div>
                <img src={count} alt="레이저 커팅기 예약 가능 횟수"/>
                <p>레이저 커팅기<br/>예약 가능 횟수</p>
            </div>

            <p><span>4</span>번 / 일주일</p>
        </Container>
    );
};

export default CountOfLaserCard;