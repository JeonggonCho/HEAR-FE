import {FC} from 'react';
import {Container} from "./style.ts";
import count from "@assets/images/count.png";
import {useUserDataStore} from "@store/useUserStore.ts";

const CountOfLaserCard:FC = () => {
    const {userData} = useUserDataStore();

    return (
        <Container>
            <div>
                <img src={count} alt="레이저 커팅기 예약 가능 횟수"/>
                <p>레이저 커팅기<br/>예약 가능 횟수</p>
            </div>

            <p><span>{typeof userData?.countOfLaser === "number" && userData.countOfLaser > 0 ? userData.countOfLaser : 0}</span>번 / 일주일</p>
        </Container>
    );
};

export default CountOfLaserCard;