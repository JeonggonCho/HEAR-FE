import {FC} from "react";
import {ButtonWrapper, LinkWrapper, SubmitWrapper} from "./style.ts";
import {IColoredBtnProps} from "@/types/componentProps.ts";

const ColoredBtn:FC<IColoredBtnProps> = ({type = "button", to, content, width, color, scale, onClick, disabled}) => {
    if (type === "button") {
        return (
            <ButtonWrapper width={width} color={color} scale={scale} onClick={onClick} disabled={disabled}>{content}</ButtonWrapper>
        );
    } else if (type === "link" && to) {
        return (
            <LinkWrapper to={to} width={width} color={color} scale={scale}>{content}</LinkWrapper>
        );
    } else if (type === "submit") {
        return (
            <SubmitWrapper type="submit" width={width} color={color} value={content as string} scale={scale} onClick={onClick} disabled={disabled}/>
        );
    } else {
        return null;
    }
};

export default ColoredBtn;