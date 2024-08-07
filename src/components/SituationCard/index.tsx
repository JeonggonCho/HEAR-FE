import {FC} from 'react';
import {Container} from "./style.ts";
import arrowForward from "../../assets/icons/arrow_forward.svg";
import {ReactSVG} from "react-svg";

const SituationCard:FC = () => {
    return (
        <Container to={"/"}>
            <h3>예약 현황</h3>
            <ReactSVG src={arrowForward}/>
        </Container>
    );
};

export default SituationCard;