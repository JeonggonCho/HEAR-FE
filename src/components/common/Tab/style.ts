import styled from "@emotion/styled";
import {Link} from "react-router-dom";
import {useThemeStore} from "@store/useThemeStore.ts";
import {lighten} from "polished";

export const ButtonTapWrapper = styled.div`
    height: 44px;
    background-color: ${({theme}) => {
        const {isDarkMode} = useThemeStore();
        return isDarkMode ? lighten(0.02, theme.colors.button.third) : theme.colors.bg.sub
    }};
    padding: 2px;
    border-radius: 10px;
    border: 1px solid ${({theme}) => theme.colors.bg.sub};
    display: flex;
    position: sticky;
    top: 72px;
    margin-bottom: 32px;
    z-index: 3;
`;

export const ButtonTap = styled.div<{active: string}>`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({active, theme}) => active === "true" ? theme.colors.font.main : theme.colors.font.sub};
    font-size: ${() => {
        const {lang} = useThemeStore();
        return lang === "en" ? "0.9rem" : "1.15rem";
    }};
    font-weight: ${({active}) => active === "true" ? "500" : "400"};
    letter-spacing: 0.5px;
    cursor: pointer;
    transition: color 0.2s ease-in-out;
    z-index: 1;
`;

export const Background = styled.div<{ activeIndex: number; tabCount: number }>`
    position: absolute;
    top: 2px;
    left: ${({ activeIndex, tabCount }) => `calc(${activeIndex} * ((100% - 4px) / ${tabCount}) + 2px)`};
    width: ${({ tabCount }) => `calc((100% - 4px) / ${tabCount})`};
    height: 38px;
    border-radius: 8px;
    background-color: ${({theme}) => {
        const {isDarkMode} = useThemeStore();
        return isDarkMode ? lighten(0.1, theme.colors.button.second) : theme.colors.bg.main
    }};
    border: 1px solid ${({theme}) => {
        const {isDarkMode} = useThemeStore();
        return isDarkMode ? lighten(0.1, theme.colors.button.second) : theme.colors.bg.main
    }};
    box-shadow: 0 0 10px ${({theme}) => theme.colors.bg.shadow};
    transition: left 0.3s ease-in-out;
    z-index: 0;
`;

export const LineTapWrapper = styled.div`
    width: 100%;
    height: 100%;
    border-bottom: 1px solid ${({theme}) => theme.colors.line.main};
    padding: 0 24px;
    position: sticky;
    top: 72px;
    background-color: ${({theme}) => theme.colors.bg.main};
    display: flex;
    align-items: center;
    z-index: 1;
`;

export const LineTap = styled(Link)<{active: string, tabcount: number}>`
    color: ${({theme, active}) => active === "true" ? theme.colors.font.main : theme.colors.font.sub};
    padding: 12px 0;
    width: calc(100% / ${({tabcount}) => tabcount});
    display: block;
    text-align: center;
    font-size: 1rem;
    font-weight: ${({active}) => active === "true" ? "500" : "400"};
    border-bottom: 3px solid ${({theme, active}) => active === "true" ? theme.colors.line.primary : theme.colors.bg.main};
`;