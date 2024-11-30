import styled from "@emotion/styled";
import {Link} from "react-router-dom";
import {useThemeStore} from "@store/useThemeStore.ts";


export const Container = styled(Link)`
    width: 100%;
    height: 100%;
    transition: all 0.2s ease-in-out 0s;
    
    &:hover {
        & > div:first-of-type {
            box-shadow: 0 0 10px ${({theme}) => theme.colors.bg.shadow};
        }

        svg {
            fill: ${({theme}) => theme.colors.font.main};
            transform: scale(1.05);
        }
    }

    &:active {
        transform: scale(0.9);
    }
    
    & > div:first-of-type {
        display: flex;
        align-items: center;
        gap: 12px;

        h3 {
            font-size: 1.15rem;
            text-wrap: wrap;
            word-break: keep-all;
            color: ${({theme}) => theme.colors.font.main};
            font-weight: 500;
            line-height: 1.5;
            margin: 0;   
        }
        
        svg {
            fill: ${({theme}) => theme.colors.icon.fill};
        }

        @media (max-width: 400px) {
            svg {
                display: ${() => {
                    const {lang} = useThemeStore();
                    return lang === "en" ? "none": "";
                }};
            }
        }

        @media (max-width: 380px) {
            svg {
                display: ${() => {
                    const {lang} = useThemeStore();
                    return lang !== "ko" ? "none": "";
                }};
            }
        }

        @media (max-width: 600px) {
            flex-direction: row-reverse;
            justify-content: space-between;
            align-items: start;

            svg {
                margin-top: 2px;
            }
        }
    }
    
    & > div:last-of-type {
        display: flex;
        align-items: center;
        justify-content: end;

        & > svg {
            color: ${({theme}) => theme.colors.font.sub};
            transition: all 0.2s ease-in-out 0s;
        }
    }
`;