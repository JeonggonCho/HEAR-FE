import styled from "@emotion/styled";
import {NavLink} from "react-router-dom";

export const HeaderElementWrapper = styled.div`
    display: flex;
    align-items: center;
`;

export const LogoWrapper = styled.div`
    width: 36px;
    height: 36px;
    margin-right: 12px;
`;

export const Logo = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export const Title = styled.h1`
    font-size: 28px;
    font-weight: bold;
    color: #2B65FC;
`;

export const AlarmWrapper = styled(NavLink)`
    width: 32px;
    margin-right: 6px;
    margin-top: 2px;
    cursor: pointer;
    
    svg {
        display: inline-block;
        fill: #c5c5c5;
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: all 0.2s ease-in-out 0s;
        
        &:hover {
            fill: #666666;
        }
    }
`;

export const Container = styled.div`
    p {
        line-height: 1.5;
        margin-bottom: 16px;
        margin-left: 8px;
    }
    
    & > div:nth-child(3),
    & > div:nth-child(4),
    & > a:nth-child(5) {
        margin-bottom: 16px;
    }

    & > div:nth-child(6) {
        display: grid;
        grid-gap: 16px;
        grid-template-columns: 1fr 1fr;
    }
`;