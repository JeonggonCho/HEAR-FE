import styled from "@emotion/styled";
import {useThemeStore} from "@store/useThemeStore.ts";

export const Container = styled.div`
    width: 100%;
    height: 132px;
    border-radius: 16px;
    background-color: ${({theme}) => theme.colors.bg.main};
    padding: 18px;
    cursor: pointer;
    transition: all 0.2s ease-in-out 0s;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 1px solid ${({theme}) => theme.colors.bg.main};

    &:hover {
        box-shadow: 0 0 10px ${({theme}) => theme.colors.bg.shadow};

        & > div:last-of-type {
            svg {
                fill: ${({theme}) => theme.colors.font.main};
                transform: scale(1.05);
            }
        }
    }

    h3 {
        font-size: 1.25rem;
        color: ${({theme}) => theme.colors.font.main};
        font-weight: 500;
        margin: 0 0 4px;
        line-height: 1.5;
        text-wrap: wrap;
        word-break: keep-all;
    }

    &:active {
        transform: scale(0.9);
    }
    
    & > div:first-of-type {
        display: flex;
        align-items: center;
        gap: 12px;

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
        justify-content: space-between;

        h4 {
            font-size: 1.15rem;
            color: ${({theme}) => theme.colors.font.main};
            font-weight: 500;
            margin: 0;
        }

        & > svg {
            color: ${({theme}) => theme.colors.font.sub};
            transition: all 0.2s ease-in-out 0s;
        }
    }
`;