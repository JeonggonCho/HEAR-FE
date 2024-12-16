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
    height: 100%;
    position: absolute;
    background-color: ${({theme}) => theme.colors.bg.main};
    
    & > div:first-of-type {
        width: 100%;
        max-width: 600px;
        height: 100vh;
        margin: auto;
        position: relative;
        background: ${({theme}) => theme.colors.bg.splash};
        animation: ${fadeOutAnimation} 0.4s ease-out 2.5s;
        animation-fill-mode: forwards;

        & > div:first-of-type {
            position: absolute;
            top: 25%;
            left: 8%;
            display: flex;
            flex-direction: column;
            gap: 18px;

            span {
                color: ${({theme}) => theme.colors.font.main};
                line-height: 1.5;
                font-size: 1.15rem;
                text-wrap: wrap;
                word-break: keep-all;
            }

            & > div:first-of-type {
                display: flex;
                align-items: center;
                gap: 12px;

                h1 {
                    margin: 0;
                    color: ${({theme}) => theme.colors.font.primary};
                    font-weight: 500;
                    font-size: 2.5rem;
                }
            }
        }

        & > span:first-of-type {
            width: 100%;
            text-align: center;
            color: ${({theme}) => theme.colors.font.sub};
            position: absolute;
            bottom: 50px;
            left: 50%;
            font-size: 0.9rem;
            transform: translateX(-50%);
        }
    }
`;