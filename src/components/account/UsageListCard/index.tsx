import {FC} from 'react';

import CardLoading from "@components/skeleton/CardLoading";

import {cardCategories} from "@constants/cardCategories.ts";
import {useThemeStore} from "@store/useThemeStore.ts";

import {Container, Usage} from "./style.ts";

import history from "@assets/images/history.png";

const UsageListCard:FC<{isLoading: boolean}> = ({isLoading}) => {
    const {lang} = useThemeStore();

    if (isLoading) {
        return <CardLoading heightValue={"120px"}/>
    }

    return (
        <Container>
            <div>
                <img src={history} alt="최근 사용 기록"/>
                <h3>{cardCategories.usage[lang]}</h3>
            </div>

            <div>
                <Usage to={"/"}>
                    <span>3D 프린터 1호기</span>
                    <span>2024.07.30</span>
                </Usage>
                <Usage to={"/"}>
                    <span>3D 프린터 2호기</span>
                    <span>2024.07.26</span>
                </Usage>
                <Usage to={"/"}>
                    <span>레이저 커팅기 1호기</span>
                    <span>2024.07.20</span>
                </Usage>
            </div>
        </Container>
    );
};

export default UsageListCard;