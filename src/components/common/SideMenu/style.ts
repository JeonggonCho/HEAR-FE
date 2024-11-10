import styled from "@emotion/styled";
import {keyframes} from "@emotion/react";

const drawLeft = keyframes`
    0% {
        opacity: 0;
        transform: translateX(-100%);
    }
    100% {
        opacity: 1;
        transform: translateX(0);
    }
`;

const drawRight = keyframes`
    0% {
        opacity: 0;
        transform: translateX(100%);
    }
    100% {
        opacity: 1;
        transform: translateX(0);
    }
`;

export const Container = styled.div`
    position: fixed;
    top: 0;
    left: 50%;
    bottom: 50px;
    transform: translateX(-50%);
    width: 100%;
    max-width: 600px;
    height: 100%;
    background: rgba(100, 100, 100, 0.5);
    backdrop-filter: blur(2px);
    z-index: 5;
    overflow: hidden;
`;

export const SideMenuWrapper = styled.div<{direction: "left" | "right"}>`
    ${({ direction }) => (direction === "right" ? "right: 0;" : "left: 0;")}
    padding: 24px;
    width: 40%;
    height: 100%;
    position: absolute;
    background-color: ${({theme}) => theme.colors.bg.main};
    animation: ${({direction}) => direction === "right" ? drawRight : drawLeft} 0.3s;

    & > div:first-of-type {
        margin-bottom: 48px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: ${({direction}) => direction === "right" ? "start" : "end"};
    }

    @media (max-width: 600px) {
        width: 50%;
    }

    @media (max-width: 400px) {
        width: 70%;
    }
`;

export const CloseBtnWrapper = styled.div`
    width: 28px;
    height: 28px;
    overflow: hidden;
    cursor: pointer;
    
    svg {
        width: 100%;
        height: 100%;
        object-fit: cover;
        fill: ${({theme}) => theme.colors.icon.fill};
        transition: all 0.2s ease-in-out 0s;
        
        &:hover {
            fill: ${({theme}) => theme.colors.font.main};
        }
    }
`;