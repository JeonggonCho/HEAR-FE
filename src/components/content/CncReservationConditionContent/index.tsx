import {FC} from "react";

import {useThemeStore} from "@store/useThemeStore.ts";
import {cardLabels} from "@constants/langCategories.ts";

import {Container} from "./style.ts";

import cnc from "@assets/images/cnc.png";

const CncReservationConditionContent: FC = () => {
    const {lang} = useThemeStore();

    return (
        <Container>
            <div>
                <div>
                    <img src={cnc} alt={"cnc 이미지"}/>
                </div>
                <h4>{cardLabels.cncReservationCondition[lang]}</h4>
            </div>
            <div>

            </div>
        </Container>
    );
};

export default CncReservationConditionContent;