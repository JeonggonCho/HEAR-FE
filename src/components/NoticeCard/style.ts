import styled from "@emotion/styled";
import {NavLink} from "react-router-dom";

export const Container = styled.div`
    width: 100%;
    background-color: white;
    border-radius: 16px;
    padding: 18px;
    transition: all 0.2s ease-in-out 0s;
    
    &:hover {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
    }

    & > div:first-child {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 24px;
        
        & > div:first-child {
            display: flex;
            align-items: center;
            gap: 4px;

            svg {
                display: flex;
                align-items: center;
                fill: #999999;
            }
        }
        
        h3 {
            margin: 0;
        }
    }

    & > div:nth-child(2) {
        display: flex;
        flex-direction: column;
        gap: 14px;
    }
`;

export const More = styled(NavLink)`
    svg {
        fill: #999999;
        transition: all 0.2s ease-in-out 0s;
        
        &:hover {
            fill: black;
            transform: scale(1.05);
        }
    }
`;

export const Notice = styled(NavLink)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: all 0.2s ease-in-out 0s;

    & > span:last-child {
        font-size: 14px;
        color: #999999;
    }
    
    &:hover {
        span:first-child {
            color: #2B65FC;
        }
    }
`;