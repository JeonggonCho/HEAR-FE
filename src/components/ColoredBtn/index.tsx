import {FC} from "react";
import {ButtonWrapper, LinkWrapper, SubmitWrapper} from "./style.ts";
import {IColoredBtnProps} from "@/types/componentProps.ts";

const ColoredBtn:FC<IColoredBtnProps> = ({type = "button", to, text, width, color, btnSize, onClick}) => {
    if (type === "button") {
        return (
            <ButtonWrapper width={width} color={color} btnSize={btnSize} onClick={onClick}>{text}</ButtonWrapper>
        );
    } else if (type === "link" && to) {
        return (
            <LinkWrapper to={to} width={width} color={color} btnSize={btnSize}>{text}</LinkWrapper>
        );
    } else if (type === "submit") {
        return (
            <SubmitWrapper type="submit" width={width} color={color} value={text} btnSize={btnSize} onClick={onClick}/>
        );
    } else {
        return null;
    }
};

export default ColoredBtn;