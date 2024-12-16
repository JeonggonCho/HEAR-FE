import React from "react";
import {useNavigate} from "react-router-dom";
import Icon from "@components/common/Icon";
import Button from "@components/common/Button";
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
        <Button
            type={"button"}
            variant={"text"}
            width={"fit"}
            color={"third"}
            size={"sm"}
            style={{padding: 0}}
            onClick={action || handleGoBack}
        >
            <Icon svg={arrowBack} isHovered={true}/>
        </Button>
    );
};

export default React.memo(ArrowBack);