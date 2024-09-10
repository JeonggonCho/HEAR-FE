import {FC} from 'react';

import ArrowForward from "@components/ArrowForward";

import {Container} from "./style.ts";

import situation from "@assets/images/situation.png";

const ConditionCard:FC = () => {
    return (
        <Container to={"/reservation/condition"}>
            <div>
                <img src={situation} alt="예약 현황"/>
                <h3>예약 현황</h3>
            </div>

            <ArrowForward/>
        </Container>
    );
};

export default ConditionCard;