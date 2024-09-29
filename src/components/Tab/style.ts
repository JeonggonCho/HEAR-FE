import styled from "@emotion/styled";
import {darken, lighten} from "polished";
import {Link} from "react-router-dom";
import {useThemeStore} from "@store/useThemeStore.ts";

export const ButtonTapWrapper = styled.div`
    width: 100%;
    height: 44px;
    background-color: ${({theme}) => theme.colors.bg.main};
    padding: 2px;
    border-radius: 10px;
    border: 1px solid ${({theme}) => theme.colors.bg.main};
    display: flex;
    position: sticky;
    top: 72px;
    margin-bottom: 32px;
    box-shadow: 0 0 10px ${({theme}) => theme.colors.bg.shadow};
    z-index: 3;
`;

export const ButtonTap = styled.div<{active: string}>`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({active, theme}) => active === "true" ? theme.colors.font.main : theme.colors.font.sub};
    font-size: 1.15rem;
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
        return isDarkMode ? lighten(0.05, theme.colors.button.third) : darken(0.05, theme.colors.button.third);
    }};
    border: 1px solid ${({theme}) => {
        const {isDarkMode} = useThemeStore();
        return isDarkMode ? lighten(0.05, theme.colors.button.third) : darken(0.05, theme.colors.button.third);
    }};
    transition: left 0.3s ease-in-out;
    z-index: 0;
`;

export const LineTapWrapper = styled.div`
    width: calc(100% + 48px);
    height: 100%;
    border-bottom: 1px solid ${({theme}) => theme.colors.line.main};
    padding: 0 24px;
    position: sticky;
    top: 80px;
    margin-left: -24px;
    background-color: ${({theme}) => theme.colors.bg.main};
    display: flex;
    align-items: center;
    z-index: 1;
`;

export const LineTap = styled(Link)<{active: string, tabcount: number}>`
    color: ${({theme, active}) => active === "true" ? theme.colors.font.primary : theme.colors.font.sub};
    padding: 12px 0;
    width: calc(100% / ${({tabcount}) => tabcount});
    display: block;
    text-align: center;
    font-size: 1.15rem;
    font-weight: ${({active}) => active === "true" ? "500" : "400"};
    border-bottom: ${({active}) => active === "true" ? "3" : "0"}px solid ${({theme}) => theme.colors.line.primary}};
`;