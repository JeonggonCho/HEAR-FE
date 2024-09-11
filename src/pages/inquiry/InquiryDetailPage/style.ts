import styled from "@emotion/styled";
import {useThemeStore} from "@store/useThemeStore.ts";
import {darken, lighten} from "polished";

export const Container = styled.div`
    & > span:first-of-type {
        display: block;
        width: fit-content;
        font-size: 14px;
        padding: 6px 8px;
        text-wrap: nowrap;
        background-color: ${({theme}) => {
            const {isDarkMode} = useThemeStore();
            return isDarkMode ? theme.colors.button.third : lighten(0.1, theme.colors.button.second);
        }};
        border-radius: 6px;
        color: ${({theme}) => {
            const {isDarkMode} = useThemeStore();
            return isDarkMode ? lighten(0.1, theme.colors.font.sub) : darken(0.1, theme.colors.font.sub);
        }};
    }

    h2 {
        margin: 24px 0 20px;
    }

    hr {
        border: none;
        border-top: 1px solid ${({theme}) => theme.colors.line.main};
        margin: 24px 0;
    }

    & > div:nth-of-type(2) {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0;
        color: ${({theme}) => theme.colors.font.sub};
        
        & > div {
            display: flex;
            align-items: center;
            gap: 12px;
        }
    }
    
    & > div:nth-of-type(3) {
        width: 100%;
        height: 100%;
        padding: 8px 0 56px 0;
        display: flex;
        flex-direction: column;
        gap: 32px;
    }
`;