import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";
import { lighten } from "polished";

const getColorStyles = (color: "primary" | "second" | "danger") => {
    const colors = {
        primary: "#2B65FC",
        second: "#c5c5c5",
        danger: "#FF8585",
    };

    const borderColor = colors[color];
    const textColor = colors[color];
    const hoverBgColor = color === "second" || color === "danger" ? lighten(0.2, colors[color]) : lighten(0.4, colors[color]);
    const activeBgColor = color === "second" || color === "danger" ? lighten(0.15, colors[color]) : lighten(0.3, colors[color]);

    return {
        borderColor,
        textColor,
        hoverBgColor,
        activeBgColor,
    };
};

const commonBtnStyle = (color: "primary" | "second" | "danger") => {
    const { borderColor, textColor, hoverBgColor, activeBgColor } = getColorStyles(color);

    return `
        padding: 6px 9px;
        text-align: center;
        color: ${textColor};
        border: 1px solid ${borderColor};
        border-radius: 8px;
        background-color: white;
        transition: all 0.1s ease-in-out 0s;
        display: inline-block;

        &:hover {
            background-color: ${hoverBgColor};
        }

        &:active {
            background-color: ${activeBgColor};
            transform: scale(0.95);
        }
    `;
};

const BaseComponent = styled.div<{ width: "full" | "fit"; color: "primary" | "second" | "danger"; }>`
    width: ${({ width }) => (width === "full" ? "100%" : "fit-content")};
    ${({ color }) => commonBtnStyle(color)};
`;

export const ButtonWrapper = BaseComponent.withComponent("button");
export const LinkWrapper = BaseComponent.withComponent(NavLink);
export const SubmitWrapper = BaseComponent.withComponent("input");
