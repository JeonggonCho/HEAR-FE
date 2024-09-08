import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { darken, lighten } from "polished";
import { useThemeStore } from "@store/useThemeStore.ts";

const commonBtnStyle = `
    text-align: center;
    transition: all 0.1s ease-in-out 0s;
    display: inline-block;
    vertical-align: middle;
    cursor: pointer;
    line-height: 1.4;
    border: none;
`;

const getBackgroundColor = (theme: any, color: "primary" | "approval" | "second" | "third" | "danger", isDarkMode:boolean) => {
    const baseColor = theme.colors.button[color];
    return isDarkMode ? lighten(0.05, baseColor) : darken(0.05, baseColor);
};

const getTextColor = (theme: any, color: "primary" | "approval" | "second" | "third" | "danger") => {
    switch (color) {
        case "primary":
        case "second":
            return "white";
        case "approval":
            return theme.colors.font.primary;
        case "third":
            return theme.colors.font.sub;
        case "danger":
            return theme.colors.font.danger;
        default:
            return;
    }
};

const BaseComponent = styled.div<{
    width: "full" | "fit";
    color: "primary" | "approval" | "second" | "third" | "danger";
    scale: "small" | "normal" | "big";
}>`
    ${commonBtnStyle};
    
    width: ${({ width }) => (width === "full" ? "100%" : "fit-content")};
    font-size: ${({ scale }) => ({
        small: "16px", 
        normal: "18px", 
        big: "20px"
    }[scale])};
    
    padding: ${({ scale }) => ({
        small: "6px 12px", 
        normal: "12px 18px", 
        big: "12px 18px"
    }[scale])};
    
    border-radius: ${({ scale }) => (scale === "big" ? "12px" : "8px")};
    background-color: ${({ theme, color }) => theme.colors.button[color]};
    color: ${({ theme, color }) => getTextColor(theme, color)};
    
    &:hover {
        background-color: ${({ theme, color }) => {
            const { isDarkMode } = useThemeStore();
            return getBackgroundColor(theme, color, isDarkMode);
        }};
    }
    
    &:active {
        transform: scale(0.95);
    }
`;

export const ButtonWrapper = BaseComponent.withComponent("button");
export const LinkWrapper = BaseComponent.withComponent(Link);
export const SubmitWrapper = BaseComponent.withComponent("input");
