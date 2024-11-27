import {useThemeStore} from "@store/useThemeStore.ts";
import {Container} from "./style.ts";
import {cardCategories} from "@constants/cardCategories.ts";
import saw from "@assets/images/saw.png";


const SawReservationConditionContent = () => {
    const {lang} = useThemeStore();

    return (
        <Container>
            <div>
                <div>
                    <img src={saw} alt={"톱 이미지"}/>
                </div>
                <h4>{cardCategories.sawReservationCondition[lang]}</h4>
            </div>
            <div>

            </div>
        </Container>
    );
};

export default SawReservationConditionContent;