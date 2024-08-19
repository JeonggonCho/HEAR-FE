import styled from "@emotion/styled";
import {NavLink} from "react-router-dom";

export const Container = styled.div`
    max-width: 600px;
    width: 100%;
    background-color: #F8F8F8;
    position: relative;
    bottom: 0;
`;

export const NavWrapper = styled.div`
    width: 100%;
    height: 80px;
    border-top: 1px solid #E2E2E2;
    border-left: 1px solid #E2E2E2;
    border-right: 1px solid #E2E2E2;
    padding: 0 28px;
    border-radius: 24px 24px 0 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: white;
    position: relative;
    z-index: 5;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
`;

export const Button = styled(NavLink)<{ active: string }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    font-size: 14px;
    color: ${({active}) => active === "true" ? "#2B65FC" : "#999999"};
    transition: all 0.2s ease-in-out 0s;
    
    &:hover {
        transform: scale(1.1);
    }
    
    &:active {
        transform: scale(0.9);
    }

    svg {
        fill: ${({active}) => active === "true" ? "#2B65FC" : "#999999"};
    }
`;