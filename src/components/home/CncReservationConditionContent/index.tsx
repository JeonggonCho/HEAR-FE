import {useThemeStore} from "@store/useThemeStore.ts";
import {Container} from "./style.ts";
import {cardCategories} from "@constants/cardCategories.ts";
import cnc from "@assets/images/cnc.png";


const CncReservationConditionContent = () => {
    const {lang} = useThemeStore();

    return (
        <Container>
            <div>
                <div>
                    <img src={cnc} alt={"cnc 이미지"}/>
                </div>
                <h4>{cardCategories.cncReservationCondition[lang]}</h4>
            </div>
            <div>

            </div>
        </Container>
    );
};

export default CncReservationConditionContent;