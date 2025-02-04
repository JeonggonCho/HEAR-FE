import {useThemeStore} from "@store/useThemeStore.ts";
import {Container} from "./style.ts";
import {cardCategories} from "@constants/cardCategories.ts";
import vacuum from "@assets/images/vacuum.png";


const VacuumReservationConditionContent = () => {
    const {lang} = useThemeStore();

    return (
        <Container>
            <div>
                <div>
                    <img src={vacuum} alt={"사출 성형기 이미지"}/>
                </div>
                <h4>{cardCategories.vacuumReservationCondition[lang]}</h4>
            </div>
            <div>

            </div>
        </Container>
    );
};

export default VacuumReservationConditionContent;