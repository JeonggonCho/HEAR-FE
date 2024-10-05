import {FC} from "react";

import {useThemeStore} from "@store/useThemeStore.ts";
import {cardLabels} from "@constants/langCategories.ts";

import {Container} from "./style.ts";

import saw from "@assets/images/saw.png";

const SawReservationConditionContent: FC = () => {
    const {lang} = useThemeStore();

    return (
        <Container>
            <div>
                <div>
                    <img src={saw} alt={"톱 이미지"}/>
                </div>
                <h4>{cardLabels.sawReservationCondition[lang]}</h4>
            </div>
            <div>

            </div>
        </Container>
    );
};

export default SawReservationConditionContent;