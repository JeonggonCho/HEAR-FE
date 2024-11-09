import {FC} from "react";

import {useThemeStore} from "@store/useThemeStore.ts";
import {cardCategories} from "@constants/cardCategories.ts";

import {Container} from "./style.ts";

import heat from "@assets/images/heat_cutter.png";

const HeatReservationConditionContent: FC = () => {
    const {lang} = useThemeStore();

    return (
        <Container>
            <div>
                <div>
                    <img src={heat} alt={"열선 이미지"}/>
                </div>
                <h4>{cardCategories.heatReservationCondition[lang]}</h4>
            </div>
            <div>

            </div>
        </Container>
    );
};

export default HeatReservationConditionContent;