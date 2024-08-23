import styled from "@emotion/styled";
import {NavLink} from "react-router-dom";

export const Container = styled.nav`
    width: 100%;
    max-width: 600px;
    height: 80px;
    border-top: 1px solid #E2E2E2;
    border-left: 1px solid #E2E2E2;
    border-right: 1px solid #E2E2E2;
    padding: 0 20px;
    border-radius: 24px 24px 0 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: white;
    position: fixed;
    bottom: 0;
    z-index: 10;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
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