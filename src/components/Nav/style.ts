import styled from "@emotion/styled";
import {NavLink} from "react-router-dom";

export const Container = styled.div`
    max-width: 600px;
    width: 100%;
    height: 80px;
    border-top: 1px solid #E2E2E2;
    position: fixed;
    bottom: 0;
    padding: 0 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #F8F8F8;
    z-index: 5;
`;

export const Button = styled(NavLink)<{ isActive: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    color: ${({isActive}) => isActive ? "#2B65FC" : "#999999"};
    transition: all 0.2s ease-in-out 0s;
    
    &:hover {
        transform: scale(1.1);
    }
    
    &:active {
        transform: scale(0.9);
    }

    svg {
        fill: ${({isActive}) => isActive ? "#2B65FC" : "#999999"};
    }
`;