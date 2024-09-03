import {FC} from 'react';
import {Container} from "./style.ts";
import count from "@assets/images/count.png";
import {useUserStore} from "@store/useUserStore.ts";

const CountOfLaserCard:FC = () => {
    const {user} = useUserStore();

    return (
        <Container>
            <div>
                <img src={count} alt="레이저 커팅기 예약 가능 횟수"/>
                <p>레이저 커팅기<br/>예약 가능 횟수</p>
            </div>

            <p><span>{typeof user?.countOfLaser === "number" && user.countOfLaser > 0 ? user.countOfLaser : 0}</span>번 / 일주일</p>
        </Container>
    );
};

export default CountOfLaserCard;