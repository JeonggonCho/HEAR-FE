import {FC} from "react";
import {ButtonWrapper, LinkWrapper, SubmitWrapper} from "./style.ts";

interface HollowBtnProps {
    type: "button" | "link" | "submit";
    to ?: string;
    text : string;
    width: "full" | "fit";
    color: "primary" | "second" | "danger";
}

const HollowBtn:FC<HollowBtnProps> = ({type = "button", to, text, width, color}) => {
    if (type === "button") {
        return (
            <ButtonWrapper width={width} color={color}>{text}</ButtonWrapper>
        );
    } else if (type === "link" && to) {
        return (
            <LinkWrapper to={to} width={width} color={color}>{text}</LinkWrapper>
        );
    } else if (type === "submit") {
        return (
            <SubmitWrapper type={type} width={width} color={color}>{text}</SubmitWrapper>
        );
    }
};

export default HollowBtn;