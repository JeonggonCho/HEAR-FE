import styled from "@emotion/styled";
import {keyframes} from "@emotion/react";

const fadeIn = keyframes`
    0% {
        opacity: 0;
        transform: translateX(-50%) scale(0.8);
    }
    100% {
        opacity: 1;
        transform: translateX(-50%) scale(1);
    }
`;

const moveUp = keyframes`
    0% {
        transform: translateX(-50%) translateY(200%);
    }
    80% {
        transform: translateX(-50%) translateY(-8%);
    }
    100% {
        transform: translateX(-50%) translateY(0%);
    }
`;

export const Container = styled.div`
    position: fixed;
    top: 0;
    left: 50%;
    bottom: 50px;
    transform: translateX(-50%);
    width: 600px;
    height: 100%;
    background: rgba(91, 91, 91, 0.5);
    backdrop-filter: blur(2px);
    z-index: 3;
`;

export const PopupWrapper = styled.div`
    padding: 12px;
    height: auto;
    max-width: 560px;
    min-width: 55%;
    border-radius: 16px;
    background-color: white;
    position: absolute;
    transform: translateX(-50%);
    left: 50%;
    top: 80px;
    animation: ${fadeIn} 0.3s;

    @media (max-width: 600px) {
        max-width: calc(100vw - 40px);
    }
`;

export const BottomSheetWrapper = styled.div`
    width: 98%;
    padding: 12px 12px 88px 12px;
    background-color: white;
    border-radius: 20px 20px 0 0;
    position: absolute;
    transform: translateX(-50%);
    left: 50%;
    bottom: 0;
    animation: ${moveUp} 0.4s;

    @media (max-width: 600px) {
        max-width: calc(100vw - 10px);
    }

    & > div:first-of-type {
        width: 64px;
        height: 6px;
        background-color: #e2e2e2;
        margin: auto auto 24px auto;
        border-radius: 3px;
        cursor: pointer;
    }
`;