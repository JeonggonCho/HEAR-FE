import {keyframes} from "@emotion/react";
import styled from "@emotion/styled";

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

export const BottomSheetWrapper = styled.div`
    width: 100%;
    padding: 12px 0 80px 0;
    background-color: ${({theme}) => theme.colors.bg.main};
    border-radius: 24px 24px 0 0;
    position: absolute;
    transform: translateX(-50%);
    left: 50%;
    bottom: -68px;
    overflow: hidden;
    animation: ${moveUp} 0.4s;

    @media (max-width: 600px) {
        max-width: 100vw;
    }
`;

export const BottomSheetHeaderWrapper = styled.div`
    padding: 12px 24px 20px;
    border-bottom: 1px solid ${({theme}) => theme.colors.line.main};
    
    h3 {
        margin: 0;
        font-weight: 500;
        font-size: 1.15rem;
        color: ${({theme}) => theme.colors.font.main};
    }
`;