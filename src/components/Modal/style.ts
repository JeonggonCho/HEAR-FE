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
    background: rgba(100, 100, 100, 0.5);
    backdrop-filter: blur(2px);
    z-index: 5;
    
    h3 {
        font-weight: 500;
    }
`;

export const PopupWrapper = styled.div`
    padding: 12px;
    height: auto;
    max-width: 80%;
    min-width: 55%;
    border-radius: 16px;
    background-color: ${({theme}) => theme.colors.bg.main};
    color: ${({theme}) => theme.colors.font.main};
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
    width: 100%;
    padding: 12px 0 80px 0;
    background-color: ${({theme}) => theme.colors.bg.main};
    border-radius: 24px 24px 0 0;
    position: absolute;
    transform: translateX(-50%);
    left: 50%;
    bottom: -68px;
    animation: ${moveUp} 0.4s;

    @media (max-width: 600px) {
        max-width: 100vw;
    }

    & > div:first-of-type {
        width: 40px;
        height: 6px;
        background-color: ${({theme}) => theme.colors.line.main};
        margin: auto auto 20px auto;
        border-radius: 3px;
        cursor: pointer;
    }
    
    h3 {
        color: ${({theme}) => theme.colors.font.main};
        width: 100%;
        text-align: center;
        font-size: 18px;
        margin-bottom: 8px;
        padding-bottom: 12px;
        border-bottom: 1px solid ${({theme}) => theme.colors.line.main};
    }
`;