import {FC} from 'react';
import {Container} from "./style.ts";
import arrowForward from "../../assets/icons/arrow_forward.svg";
import {ReactSVG} from "react-svg";
import situation from "../../assets/images/situation.png";

const SituationCard:FC = () => {
    return (
        <Container to={"/reservation/situation"}>
            <div>
                <img src={situation} alt="예약 현황"/>
                <h3>예약 현황</h3>
            </div>

            <ReactSVG src={arrowForward}/>
        </Container>
    );
};

export default SituationCard;