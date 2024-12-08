import React from "react";
import {ReactSVG} from "react-svg";
import {useNavigate} from "react-router-dom";
import {ArrowBackWrapper} from "./style.ts";
import arrowBack from "@assets/icons/arrow_back.svg";


interface IArrowBack {
    action?: () => void;
}


const ArrowBack = ({action}: IArrowBack) => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <ArrowBackWrapper onClick={action || handleGoBack}>
            <ReactSVG src={arrowBack}/>
        </ArrowBackWrapper>
    );
};

export default React.memo(ArrowBack);