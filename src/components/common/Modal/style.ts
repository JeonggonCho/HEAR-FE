import {keyframes} from "@emotion/react";
import styled from "@emotion/styled";

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

export const ModalWrapper = styled.div`
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
    top: 40px;
    animation: ${fadeIn} 0.3s;

    @media (max-width: 600px) {
        max-width: calc(100vw - 40px);
    }
`;