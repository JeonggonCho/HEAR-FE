import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";
import { darken, lighten } from "polished";

const commonBtnStyle = `
    padding: 6px 9px;
    text-align: center;
    border-radius: 8px;
    transition: all 0.1s ease-in-out 0s;
    display: inline-block;
`;

const getColorStyles = (color: "primary" | "second" | "danger") => {
    const colors = {
        primary: "#2B65FC",
        second: "#c5c5c5",
        danger: "#FFF1F1",
    };

    const textColor = color === "danger" ? "#FF8585" : "white";

    return {
        backgroundColor: colors[color],
        borderColor: colors[color],
        color: textColor,
        hoverBgColor: color === "danger" ? darken(0.05, colors[color]) : lighten(0.1, colors[color]),
        activeBgColor: darken(color === "danger" ? 0.1 : 0.2, colors[color]),
    };
};

const BaseComponent = styled.div<{ width: "full" | "fit"; color: "primary" | "second" | "danger"; }>`
    width: ${({ width }) => (width === "full" ? "100%" : "fit-content")};
    
    ${({ color }) => {
    const { backgroundColor, borderColor, color: textColor, hoverBgColor, activeBgColor } = getColorStyles(color);
    return `
            background-color: ${backgroundColor};
            border: 1px solid ${borderColor};
            color: ${textColor};

            &:hover {
                background-color: ${hoverBgColor};
                border-color: ${hoverBgColor};
            }

            &:active {
                background-color: ${activeBgColor};
                border-color: ${activeBgColor};
                transform: scale(0.95);
            }
        `;
    }}
    
    ${commonBtnStyle};
`;

export const ButtonWrapper = BaseComponent.withComponent("button");
export const LinkWrapper = BaseComponent.withComponent(NavLink);
export const SubmitWrapper = BaseComponent.withComponent("input");
