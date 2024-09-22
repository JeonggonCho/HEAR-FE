import styled from "@emotion/styled";
import {darken, lighten} from "polished";
import {useThemeStore} from "@store/useThemeStore.ts";

export const Container = styled.div`
    width: 100%;
    padding: 16px;
    border-radius: 16px;
    background-color: ${({theme}) => {
        const {isDarkMode} = useThemeStore();
        return isDarkMode ? darken(0.05, theme.colors.button.approval) : lighten(0.02, theme.colors.button.approval)
    }};
    color: ${({theme}) => theme.colors.font.primary};
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    gap: 16px;
    box-shadow: 0 0 10px ${({theme}) => theme.colors.bg.shadow};

    & > div:first-of-type, & > div:last-of-type {
        text-align: center;
        width: 100%;
        line-height: 1.2;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 6px;

        p {
            margin: 0 0 -2px;
            font-size: 16px;
        }

        span {
            font-size: 12px;
        }

        h3 {
            font-size: 18px;
            font-weight: 500;
            margin: 0;
        }
    }

    & > div:nth-of-type(2) {
        min-height: 60px;
        border-left: 1px solid ${({theme}) => {
            const {isDarkMode} = useThemeStore();
            return isDarkMode? darken(0.1, theme.colors.line.primary) : lighten(0.2, theme.colors.line.primary);
        }};
    }
`;