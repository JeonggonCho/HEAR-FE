import styled from "@emotion/styled";
import {keyframes} from "@emotion/react";


const spin = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

export const Ring = styled.div<{size: number, thickness: number, background: boolean, ringColor: "white" | "sub"}>`
    position: relative;
    width: ${({size}) => typeof size === "number" ? `${size}px` : null};
    height: ${({size}) => typeof size === "number" ? `${size}px` : null};
    border-radius: 50%;
    border: ${({theme, thickness, background}) => background ? `${thickness}px solid ${theme.colors.font.placeholder}` : null};

    &:after {
        content: '';
        position: absolute;
        top: ${({thickness}) => `-${thickness}px`};
        left: ${({thickness}) => `-${thickness}px`};
        width: ${({size, thickness}) => typeof size === "number" ? `${size - thickness * 2}px` : null};
        height: ${({size, thickness}) => typeof size === "number" ? `${size - thickness * 2}px` : null};
        border-radius: 50%;
        border: ${({thickness}) => `${thickness}px solid`};
        border-color: ${({ theme, ringColor }) => ringColor === "white" ? "white" : theme.colors.font.sub} transparent transparent transparent;
        animation: ${spin} 0.5s linear infinite;
    }
`;