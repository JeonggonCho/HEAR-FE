import styled from "@emotion/styled";
import { Link } from "react-router-dom";
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
        display: inline-flex;
        align-items: center;
        justify-content: center;
        vertical-align: middle;
        cursor: pointer;
        line-height: 1.4;

        &:hover {
            background-color: ${hoverBgColor};
        }

        &:active {
            background-color: ${activeBgColor};
            transform: scale(0.95);
        }
    `;
};

const BaseComponent = styled.div<{ width: "full" | "fit"; color: "primary" | "second" | "danger"; scale: "small" | "normal" | "big";}>`
    width: ${({ width }) => (width === "full" ? "100%" : "fit-content")};
    font-size: ${({scale}) => scale === "small" ? "16px" : scale === "normal" ? "18px" : "20px"};
    padding: ${({scale}) => scale === "small" ? "6px 12px" : "12px 18px"};
    border-radius: ${({scale}) => scale === "big" ? "12px" : "8px"};

    ${({ color }) => commonBtnStyle(color)};
`;

export const ButtonWrapper = BaseComponent.withComponent("button");
export const LinkWrapper = BaseComponent.withComponent(Link);
export const SubmitWrapper = BaseComponent.withComponent("input");
