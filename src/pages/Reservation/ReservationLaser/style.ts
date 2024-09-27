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
            gap: 10px;
            
            & > label {
                margin-left: 6px;
                font-size: 16px;
                color: ${({theme}) => theme.colors.font.sub};
            }
            
            & > div {
                padding: 8px;
                background-color: ${({theme}) => {
                  const {isDarkMode} = useThemeStore();
                  return isDarkMode ? darken(0.01, theme.colors.bg.main) : lighten(0.05, theme.colors.bg.sub)
                }};
                border-radius: 12px;
                
                & > div:last-of-type {
                    height: 100px;
                }
            } 
        }
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