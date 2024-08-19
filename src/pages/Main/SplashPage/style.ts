import styled from "@emotion/styled";
import {keyframes} from "@emotion/react";

const fadeOutAnimation = keyframes` 
    from {
        opacity: 1;
    } 
    to {
        opacity: 0;
    }
`;

export const Container = styled.div`
    width: 100%;
    height: 100vh;
    position: relative;
    background: linear-gradient(150deg, #E2E3F7 8.51%, #FFFFFF 35.48%, #C6D6FF 61.62%, #EEFAFF 84.02%);
    animation: ${fadeOutAnimation} 0.3s ease-out;
    animation-fill-mode: forwards;
    animation-delay: 2.8s;
    
    & > div:first-of-type {
        position: absolute;
        top: 25%;
        left: 8%;
        display: flex;
        flex-direction: column;
        gap: 18px;

        span {
            line-height: 1.5;
            font-size: 18px;
        }
        
        div {
            display: flex;
            align-items: center;

            svg {
                width: 56px;
                height: auto;
                margin-right: 12px;
            }

            h1 {
                margin: 0;
                color: #2B65FC;
                font-weight: bold;
                font-size: 40px;
            }
        }
    }
    
    & > span:first-of-type {
        width: 100%;
        text-align: center;
        color: #999999;
        position: absolute;
        bottom: 50px;
        left: 50%;
        font-size: 14px;
        transform: translateX(-50%);
    }
`;