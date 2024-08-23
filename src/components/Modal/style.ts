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
    width: 600px;
    height: 100%;
    background: rgba(91, 91, 91, 0.5);
    backdrop-filter: blur(2px);
    z-index: 3;
    
    & > div:first-of-type {
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
    }
`;

