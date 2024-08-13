import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";
import { lighten } from "polished";

const getColorStyles = (color: "primary" | "second" | "danger") => {
    const colors = {
        primary: "#2B65FC",
        second: "#999999",
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
        text-align: center;
        color: ${textColor};
        border: 1px solid ${borderColor};
        background-color: white;
        transition: all 0.1s ease-in-out 0s;
        display: inline-block;
        vertical-align: center;

        &:hover {
            background-color: ${hoverBgColor};
        }

        &:active {
            background-color: ${activeBgColor};
            transform: scale(0.95);
        }
    `;
};

const BaseComponent = styled.div<{ width: "full" | "fit"; color: "primary" | "second" | "danger"; btnSize: "small" | "normal" | "big";}>`
    width: ${({ width }) => (width === "full" ? "100%" : "fit-content")};
    font-size: ${({btnSize}) => btnSize === "small" ? "16px" : btnSize === "normal" ? "18px" : "20px"};
    padding: ${({btnSize}) => btnSize === "small" ? "6px 9px" : "12px 18px"};
    border-radius: ${({btnSize}) => btnSize === "big" ? "12px" : "8px"};
    cursor: pointer;

    ${({ color }) => commonBtnStyle(color)};
`;

export const ButtonWrapper = BaseComponent.withComponent("button");
export const LinkWrapper = BaseComponent.withComponent(NavLink);
export const SubmitWrapper = BaseComponent.withComponent("input");
