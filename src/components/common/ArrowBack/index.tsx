import React, {FC} from "react";
import {ReactSVG} from "react-svg";
import {useNavigate} from "react-router-dom";

import {Container} from "./style.ts";

import arrowBack from "@assets/icons/arrow_back.svg";

const ArrowBack:FC = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <Container onClick={handleGoBack}>
            <ReactSVG src={arrowBack}/>
        </Container>
    );
};

export default React.memo(ArrowBack);