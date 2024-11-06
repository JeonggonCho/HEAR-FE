import {FC} from 'react';
import {ReactSVG} from "react-svg";

import {IFloatingButtonProps} from "@/types/componentProps.ts";

import {LinkWrapper, ButtonWrapper} from "./style.ts";


const FloatingButton:FC<IFloatingButtonProps> = ({type, to, action, icon}) => {
    return (
        <>
            {type === "link" && to ?
                <LinkWrapper to={to}>
                    <ReactSVG src={icon}/>
                </LinkWrapper> :
                <ButtonWrapper onClick={action}>
                    <ReactSVG src={icon}/>
                </ButtonWrapper>
            }
        </>
    );
};

export default FloatingButton;