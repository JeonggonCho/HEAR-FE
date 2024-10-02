import {FC} from 'react';

import {useUserDataStore} from "@store/useUserStore.ts";

import {Container} from "./style.ts";

import count from "@assets/images/count.png";

const CountOfLaserCard:FC = () => {
    const {userData} = useUserDataStore();

    return (
        <Container>
            <div>
                <img src={count} alt="레이저 커팅기 예약 가능 횟수"/>
                <p>레이저 커팅기<br/>예약 가능 횟수</p>
            </div>

            <p><span>{typeof userData?.countOfLaserPerWeek === "number" && userData.countOfLaserPerWeek > 0 ? userData.countOfLaserPerWeek : 0}</span> 번 / 일주일</p>
        </Container>
    );
};

export default CountOfLaserCard;