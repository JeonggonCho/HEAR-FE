import { css } from "@emotion/react";
import { darken, lighten } from "polished";

// 공통 스타일
const commonBtnStyle = css`
    text-align: center;
    transition: all 0.1s ease-in-out;
    display: flex;
    align-items: center;
    justify-content: center;
    vertical-align: middle;
    border: none;
    white-space: nowrap;
    cursor: pointer;
`;

// 배경색 계산 함수
const getBackgroundColor = (theme: any, color: string, darkMode: string) => {
    const baseColor = theme.colors.button[color];
    return darkMode === "true" ? lighten(0.05, baseColor) : darken(0.05, baseColor);
};

// 텍스트 색상 계산 함수
const getTextColor = (theme: any, color: string, darkMode: string) => {
    switch (color) {
        case "primary":
            return "white";
        case "second":
            return darkMode === "true"
                ? lighten(0.1, theme.colors.font.sub)
                : "white";
        case "approval":
            return theme.colors.font.primary;
        case "third":
            return theme.colors.font.sub;
        case "danger":
            return theme.colors.font.danger;
        default:
            return "inherit";
    }
};

// 버튼 스타일 정의
export const buttonStyles = (
    {
        variant,
        width,
        color,
        size,
        disabled,
        darkMode,
    }: {
        variant: "text" | "filled";
        width: "full" | "fit";
        color: "primary" | "approval" | "second" | "third" | "danger";
        size: "sm" | "md" | "lg";
        disabled: boolean;
        darkMode: string;
    }) => (theme: any) => css`
    ${commonBtnStyle};
    width: ${width === "full" ? "100%" : "fit-content"};
    font-size: ${{
        sm: "1rem", 
        md: "1.15rem", 
        lg: "1.25rem",
    }[size]};
    padding: ${{
        sm: "8px 14px",
        md: "12px 18px",
        lg: "16px 18px",
    }[size]};
    border-radius: ${size === "lg" ? "12px" : size === "md" ? "10px" : "8px"};
    background-color: ${variant === "text" ? "transparent" 
            : disabled && darkMode === "false" ? darken(0.05, theme.colors.button.third) 
                    : disabled && darkMode === "true" ? theme.colors.button.third 
                            : theme.colors.button[color]};
    color: ${disabled && darkMode === "false" ? lighten(0.2, theme.colors.font.sub) 
            : disabled && darkMode === "true" ? theme.colors.font.placeholder 
                    : getTextColor(theme, color, darkMode)};
    cursor: ${disabled ? "not-allowed" : "pointer"};

    svg {
        margin-top: 4px;
        fill: ${disabled && darkMode === "false" ? lighten(0.2, theme.colors.font.sub) 
                : disabled && darkMode === "true" ? theme.colors.font.placeholder 
                        : getTextColor(theme, color, darkMode)};
        width: 20px;
        height: 20px;
    }

    &:hover {
        background-color: ${(variant !== "text" && !disabled) && getBackgroundColor(theme, color, darkMode)};
    }

    &:active {
        transform: ${!disabled && "scale(0.95)"};
    }
`;
