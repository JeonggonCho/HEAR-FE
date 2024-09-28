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
`;

export const Ring = styled.div`
    width: 64px;
    height: 64px;
    
    &:after {
        content: ' ';
        display: block;
        width: 46px;
        height: 46px;
        border-radius: 50%;
        border: 5px solid ${({theme}) => theme.colors.font.placeholder};
        border-color: ${({theme}) => theme.colors.font.placeholder} transparent ${({theme}) => theme.colors.font.placeholder} transparent;
        animation: ${spin} 0.8s linear infinite;
    }
`;