import {To} from "react-router-dom";
import {ReactSVG} from "react-svg";
import {LinkWrapper, ButtonWrapper} from "./style.ts";


interface IFloatingButtonProps {
    type: "link" | "button";
    to?: To;
    action?: () => void;
    icon: string;
}


const FloatingButton = ({type, to, action, icon}: IFloatingButtonProps) => {
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