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

export const Container = styled.div`
    height: 100% !important;
    width: 100% !important;
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    z-index: 3;
`;

export const Ring = styled.div`
    position: relative;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 5px solid ${({theme}) => theme.colors.font.placeholder};

    &:after {
        position: absolute;
        top: -5px;
        left: -5px;
        content: '';
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: 5px solid;
        border-color: ${({theme}) => theme.colors.font.sub} transparent transparent transparent;
        animation: ${spin} 0.4s linear infinite;
    }
`;