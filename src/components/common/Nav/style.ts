import styled from "@emotion/styled";
import {NavLink} from "react-router-dom";
import {darken, lighten} from "polished";

export const Container = styled.nav`
    width: 100%;
    max-width: 600px;
    height: 100px;
    border-top: 1px solid ${({theme}) => theme.colors.line.main};
    border-left: 1px solid ${({theme}) => theme.colors.line.main};
    border-right: 1px solid ${({theme}) => theme.colors.line.main};
    padding: 4px 20px 20px 20px;
    border-radius: 24px 24px 0 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: ${({theme}) => theme.colors.bg.main};
    position: fixed;
    bottom: -8px;
    z-index: 3;
    transition: all 0.2s ease-in-out 0s;
    box-shadow: 0 0 10px ${({theme}) => theme.colors.bg.shadow};
`;

export const NavButton = styled(NavLink)<{ active: string, darkmode: string }>`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9rem;
    text-wrap: nowrap;
    color: ${({active, theme}) => active === "true" ? theme.colors.font.primary : theme.colors.font.sub};
    flex-grow: 1;
    transition: all 0.2s ease-in-out 0s;
    
    &:hover {
        transform: scale(1.1);
    }
    
    &:active {
        transform: scale(0.9);
    }
    
    & > div:first-of-type {
        width: 56px;
        height: 56px;
        padding: 6px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;

        svg {
            fill: ${({active, theme, darkmode}) => active === "true" ? theme.colors.button.primary : darkmode === "true" ? lighten(0.1, theme.colors.icon.fill) : darken(0.1, theme.colors.icon.fill)};
        }
    }
`;