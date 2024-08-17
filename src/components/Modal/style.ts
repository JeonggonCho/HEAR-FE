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


export const Container = styled.div`
    position: fixed;
    top: 0;
    left: 50%;
    bottom: 50px;
    transform: translateX(-50%);
    max-width: 600px;
    width: 100%;
    height: 100%;
    background: rgba(91, 91, 91, 0.5);
    backdrop-filter: blur(2px);
    z-index: 3;
    
    & > div:first-child {
        padding: 12px;
        max-width: 332px;
        width: 100%;
        height: auto;
        border-radius: 16px;
        background-color: white;
        position: absolute;
        transform: translateX(-50%);
        left: 50%;
        top: 100px;
        animation: ${fadeIn} 0.3s;
    }
`;

