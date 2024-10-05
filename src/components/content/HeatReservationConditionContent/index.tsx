import {FC} from "react";

import {useThemeStore} from "@store/useThemeStore.ts";
import {cardLabels} from "@constants/langCategories.ts";

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
                <h4>{cardLabels.heatReservationCondition[lang]}</h4>
            </div>
            <div>

            </div>
        </Container>
    );
};

export default HeatReservationConditionContent;