import styled from "@emotion/styled";
import {NavLink} from "react-router-dom";

export const Container = styled.nav`
    width: 100%;
    max-width: 600px;
    height: 80px;
    border-top: 1px solid ${({theme}) => theme.colors.line.main};
    border-left: 1px solid ${({theme}) => theme.colors.line.main};
    border-right: 1px solid ${({theme}) => theme.colors.line.main};
    padding: 0 20px;
    border-radius: 24px 24px 0 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: ${({theme}) => theme.colors.bg.main};
    position: fixed;
    bottom: -1px;
    z-index: 3;
    transition: all 0.2s ease-in-out 0s;
    box-shadow: 0 0 10px ${({theme}) => theme.colors.bg.shadow};
`;

export const Button = styled(NavLink)<{ active: string }>`
    width: 56px;
    height: 56px;
    padding: 6px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    color: ${({active, theme}) => active === "true" ? theme.colors.font.primary : theme.colors.font.sub};
    transition: all 0.2s ease-in-out 0s;
    
    &:hover {
        transform: scale(1.1);
    }
    
    &:active {
        transform: scale(0.9);
    }

    svg {
        fill: ${({active, theme}) => active === "true" ? theme.colors.button.primary : theme.colors.icon.fill};
    }
`;