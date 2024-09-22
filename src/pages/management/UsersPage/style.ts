import styled from "@emotion/styled";
import {useThemeStore} from "@store/useThemeStore.ts";
import {darken, lighten} from "polished";

export const Container = styled.div`
    width: 100%;
    position: relative;
    
    & > div:nth-of-type(2) {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 8px;
        
        & > span:first-of-type {
            margin-left: 4px;
            font-size: 18px;
        }
        
        & > div:first-of-type {
            display: flex;
            align-items: center;
            gap: 4px;
        }
        
        select {
            padding: 6px;
            border-radius: 6px;
            background-color: ${({theme}) => theme.colors.bg.sub};
            border: 2px solid ${({theme}) => theme.colors.line.main};
            color: ${({theme}) => theme.colors.font.main};

            &:focus {
                outline: ${({theme}) => theme.colors.line.primary};
            }
        }
    }
    
    & > div:nth-of-type(3) {
        width: 100%;
        display: flex;
        align-items: center;
        background-color: ${({theme}) => {
            const {isDarkMode} = useThemeStore();
            return isDarkMode ? lighten(0.05, theme.colors.button.third) : darken(0.05, theme.colors.button.third);
        }};        
        padding: 12px 16px;
        border-radius: 8px;
        margin-bottom: 12px;
        position: sticky;
        top: 72px;
        color: ${({theme}) => theme.colors.font.sub};
        z-index: 3;
        
        span {
            text-align: center;
        }
        
        & > span:first-of-type {
            width: 20%;
        }
        
        & > span:nth-of-type(2) {
            width: 15%;
        }
        
        & > span:nth-of-type(3) {
            width: 35%;
        }

        & > span:nth-of-type(4) {
            width: 15%;
        }

        & > span:nth-of-type(5) {
            width: 20%;
        }
    }
`;