import {FC} from 'react';
import {ReactSVG} from "react-svg";

import {IFloatingButtonProps} from "@/types/componentProps.ts";

import {Container} from "./style.ts";

import write from "@assets/icons/write.svg";

const FloatingButton:FC<IFloatingButtonProps> = ({to}) => {
    return (
        <Container to={to}>
            <ReactSVG src={write}/>
        </Container>
    );
};

export default FloatingButton;