import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { darken, lighten } from "polished";

const commonBtnStyle = `
    text-align: center;
    transition: all 0.1s ease-in-out 0s;
    display: inline-block;
    vertical-align: middle;
    cursor: pointer;
    line-height: 1.4;

`;

const getColorStyles = (color: "primary" | "approval" | "second" | "third" | "danger") => {
    const colors = {
        primary: "#2B65FC",
        approval: "#F0F4FF",
        second: "#c5c5c5",
        third: "#F8F8F8",
        danger: "#FFF1F1",
    };

    const textColor = color === "danger" ? "#FF8585" : color === "third" ? "#999999" : color === "approval" ? "#2B65FC" : "white";

    return {
        backgroundColor: colors[color],
        borderColor: colors[color],
        color: textColor,
        hoverBgColor: color === "danger" || color === "third" || color === "approval" ? darken(0.05, colors[color]) : lighten(0.1, colors[color]),
        activeBgColor: darken(color === "danger" || color === "third" || color === "approval" ? 0.1 : 0.2, colors[color]),
    };
};

const BaseComponent = styled.div<{ width: "full" | "fit"; color: "primary" | "approval" | "second" | "third" | "danger"; scale: "small" | "normal" | "big";}>`
    width: ${({ width }) => (width === "full" ? "100%" : "fit-content")};
    font-size: ${({scale}) => scale === "small" ? "16px" : scale === "normal" ? "18px" : "20px"};
    padding: ${({scale}) => scale === "small" ? "6px 12px" : "12px 18px"};
    border-radius: ${({scale}) => scale === "big" ? "12px" : "8px"};
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
export const LinkWrapper = BaseComponent.withComponent(Link);
export const SubmitWrapper = BaseComponent.withComponent("input");
