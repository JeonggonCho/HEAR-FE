import {FC} from "react";

import {useThemeStore} from "@store/useThemeStore.ts";
import {cardCategories} from "@constants/cardCategories.ts";

import {Container} from "./style.ts";

import laser from "@assets/images/laser_cut.png";

const LaserReservationConditionContent: FC = () => {
    const {lang} = useThemeStore();

    return (
        <Container>
            <div>
                <div>
                    <img src={laser} alt={"레이저 커팅기 이미지"}/>
                </div>
                <h4>{cardCategories.laserReservationCondition[lang]}</h4>
            </div>
            <div>

            </div>
        </Container>
    );
};

export default LaserReservationConditionContent;