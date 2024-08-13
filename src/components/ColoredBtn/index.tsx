import {FC} from "react";
import {ButtonWrapper, LinkWrapper, SubmitWrapper} from "./style.ts";

interface ColoredBtnProps {
    type: "button" | "link" | "submit";
    to ?: string;
    text : string;
    width: "full" | "fit";
    color: "primary" | "approval" | "second" | "third" | "danger";
    btnSize: "small" | "normal" | "big";
}

const ColoredBtn:FC<ColoredBtnProps> = ({type = "button", to, text, width, color, btnSize}) => {
    if (type === "button") {
        return (
            <ButtonWrapper width={width} color={color} btnSize={btnSize}>{text}</ButtonWrapper>
        );
    } else if (type === "link" && to) {
        return (
            <LinkWrapper to={to} width={width} color={color} btnSize={btnSize}>{text}</LinkWrapper>
        );
    } else if (type === "submit") {
        return (
            <SubmitWrapper type="submit" width={width} color={color} value={text} btnSize={btnSize}/>
        );
    } else {
        return null;
    }
};

export default ColoredBtn;