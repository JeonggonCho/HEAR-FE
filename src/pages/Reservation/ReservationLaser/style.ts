import styled from "@emotion/styled";
import {useThemeStore} from "@store/useThemeStore.ts";
import {darken, lighten} from "polished";

export const Container = styled.div`
    form {
        display: flex;
        flex-direction: column;
        gap: 32px;

        & > div:last-of-type {
            display: flex;
            flex-direction: column;
            gap: 8px;
            
            & > label {
                margin-left: 6px;
                font-size: 1rem;
                color: ${({theme}) => theme.colors.font.sub};
            }

            & > div:last-of-type {
                padding: 8px;
                background-color: ${({theme}) => {
                    const {isDarkMode} = useThemeStore();
                    return isDarkMode ? darken(0.01, theme.colors.bg.main) : lighten(0.05, theme.colors.bg.sub)
                }};
                border-radius: 12px;
                
                & > p {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    height: 80px;
                    color: ${({theme}) => theme.colors.font.sub};
                    font-size: 1rem;
                }
            }
        }
    }
`;

export const MapIcon = styled.div`
    width: 36px;
    height: 36px;
    overflow: hidden;
    cursor: pointer;
    
    &:hover {
        svg {
            fill: ${({theme}) => theme.colors.font.main};
        }
    }
    
    svg {
        width: 100%;
        height: 100%;
        object-fit: cover;
        fill: ${({theme}) => theme.colors.icon.fill};
        transition: all 0.2s ease-in-out 0s;
    }
`;

export const ImageWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 24px;

    img {
        width: 120px;
        height: 120px;
        object-fit: cover;
    }
`;

export const LaserSelectContentWrapper = styled.div`
    padding: 24px;
`;