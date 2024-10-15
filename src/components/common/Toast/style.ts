import styled from "@emotion/styled";
import {keyframes} from "@emotion/react";

const fadeIn = keyframes`
    0% {
        opacity: 0;
        transform: translate(-50%, 20px);
    }
    100% {
        opacity: 1;
        transform: translate(-50%, 0);
    }
`;

const fadeOut = keyframes`
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
        transform: translate(-50%, -20px);
    }
`;

export const Container = styled.div<{time: number, type: "success" | "error" | "normal"}>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 32px;
    max-width: 500px;
    min-width: 300px;
    padding: 8px 12px;
    position: fixed;
    bottom: 120px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 16px;
    border: 1px solid ${({theme, type}) => type === "error" ? theme.colors.line.danger : type === "success" ? theme.colors.line.primary : theme.colors.line.main};
    background-color: ${({theme}) => theme.colors.bg.main};
    opacity: 0;
    box-shadow: 0 0 10px ${({theme}) => theme.colors.bg.shadow};
    animation: ${fadeIn} 0.5s forwards, ${fadeOut} 0.5s ${({time}) => time - 1000}ms forwards;
    z-index: 10;
    
    & > div:first-of-type {
        display: flex;
        align-items: center;
        gap: 12px;
        
        svg {
            width: 32px;
            height: 32px;
            fill: ${({theme, type}) => type === "error" ? theme.colors.font.danger : theme.colors.icon.fill};
        }

        & > p {
            margin: 0;
            line-height: 1.2;
            color: ${({theme}) => theme.colors.font.main};
            text-wrap: wrap;
            word-break: keep-all;
        }
    }
    
    & > div:last-of-type {
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        
        &:hover {
            svg {
                fill: ${({theme}) => theme.colors.font.main};
            }
        }
        
        svg {
            fill: ${({theme}) => theme.colors.icon.fill};
            transition: all 0.2s ease-in-out 0s;
        }
    }
`;
