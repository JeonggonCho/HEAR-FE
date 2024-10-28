import {FC} from "react";

import {IButtonProps} from "@/types/componentProps.ts";

import {ButtonWrapper, LinkWrapper, SubmitWrapper} from "./style.ts";
import {useThemeStore} from "@store/useThemeStore.ts";

const Button:FC<IButtonProps> = ({type = "button", to, content, width, color, scale, onClick, disabled}) => {
    const { isDarkMode } = useThemeStore();

    if (type === "button") {
        return (
            <ButtonWrapper type="button" width={width} color={color} scale={scale} onClick={onClick} disabled={disabled} aria-disabled={disabled} darkmode={isDarkMode.toString()}>{content}</ButtonWrapper>
        );
    } else if (type === "link" && to) {
        return (
            <LinkWrapper to={to} width={width} color={color} scale={scale} disabled={disabled} darkmode={isDarkMode.toString()}>{content}</LinkWrapper>
        );
    } else if (type === "submit") {
        return (
            <SubmitWrapper type="submit" width={width} color={color} scale={scale} onClick={onClick} disabled={disabled} darkmode={isDarkMode.toString()}>{content}</SubmitWrapper>
        );
    } else {
        return null;
    }
};

export default Button;