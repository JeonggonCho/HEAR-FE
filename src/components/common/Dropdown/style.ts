import styled from "@emotion/styled";
import {useThemeStore} from "@store/useThemeStore.ts";
import {lighten} from "polished";

export const Container = styled.div`
    position: relative;

    svg {
        display: flex;
        align-items: center;
        justify-content: center;
        fill: ${({theme}) => theme.colors.font.sub};
        cursor: pointer;
    }
`;

export const DropdownWrapper = styled.div`
    position: absolute;
    padding: 6px 0;
    top: 32px;
    right: 4px;
    border-radius: 6px;
    background-color: ${({theme}) => {
        const {isDarkMode} = useThemeStore();
        return isDarkMode ? lighten(0.1, theme.colors.bg.main) : theme.colors.bg.main;
    }};
    box-shadow: 0 0 10px ${({theme}) => theme.colors.bg.shadow};
    display: flex;
    flex-direction: column;
    z-index: 2;
`;

export const DropdownMenu = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 18px 10px 12px;
    transition: all 0.1s ease-in-out 0s;
    cursor: pointer;
    font-size: 0.9rem;
    text-wrap: nowrap;
    color: ${({theme}) => theme.colors.font.sub};

    &:hover {
        background-color: ${({theme}) => {
            const {isDarkMode} = useThemeStore();
            return isDarkMode ? theme.colors.bg.main : theme.colors.button.third;
        }};
    }

    svg {
        width: 20px;
        height: 20px;
        fill: ${({theme}) => {
            const {isDarkMode} = useThemeStore();
            return isDarkMode ? lighten(0.2, theme.colors.icon.fill) : theme.colors.icon.fill;
        }};
    }
`;