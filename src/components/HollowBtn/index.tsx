import {FC} from "react";
import {ButtonWrapper, LinkWrapper, SubmitWrapper} from "./style.ts";
import {IHollowBtnProps} from "@/types/componentProps.ts";

const HollowBtn:FC<IHollowBtnProps> = ({type = "button", to, text, width, color, scale, onClick}) => {
    if (type === "button") {
        return (
            <ButtonWrapper width={width} color={color} scale={scale} onClick={onClick}>{text}</ButtonWrapper>
        );
    } else if (type === "link" && to) {
        return (
            <LinkWrapper to={to} width={width} color={color} scale={scale}>{text}</LinkWrapper>
        );
    } else if (type === "submit") {
        return (
            <SubmitWrapper type="submit" width={width} color={color} value={text} scale={scale} onClick={onClick}/>
        );
    } else {
        return null;
    }
};

export default HollowBtn;