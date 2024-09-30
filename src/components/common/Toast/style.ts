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

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 400px;
    min-width: 250px;
    padding: 16px 32px;
    line-height: 1.2;
    position: fixed;
    bottom: 120px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 16px;
    background-color: ${({theme}) => theme.colors.bg.main};
    color: ${({theme}) => theme.colors.font.main};
    opacity: 0;
    box-shadow: 0 0 10px ${({theme}) => theme.colors.bg.shadow};
    animation: ${fadeIn} 0.5s forwards, ${fadeOut} 0.5s 4s forwards;
    z-index: 10;
`;
