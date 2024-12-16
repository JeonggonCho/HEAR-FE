import {To} from "react-router-dom";
import Icon from "@components/common/Icon";
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
                    <Icon svg={icon}/>
                </LinkWrapper> :
                <ButtonWrapper onClick={action}>
                    <Icon svg={icon}/>
                </ButtonWrapper>
            }
        </>
    );
};

export default FloatingButton;