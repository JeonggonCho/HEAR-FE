import {useThemeStore} from "@store/useThemeStore.ts";
import {Container} from "./style.ts";
import {cardCategories} from "@constants/cardCategories.ts";
import heat from "@assets/images/heat_cutter.png";


const HeatReservationConditionContent = () => {
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