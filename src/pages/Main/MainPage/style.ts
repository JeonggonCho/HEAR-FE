import styled from "@emotion/styled";
import {Link} from "react-router-dom";

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

export const AlarmWrapper = styled(Link)`
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
        margin: 0 0 24px 6px;
    }

    & > div:nth-of-type(2),
    & > div:nth-of-type(3),
    & > a:nth-of-type(1) {
        margin-bottom: 16px;
    }

    & > div:nth-of-type(4) {
        display: grid;
        grid-gap: 16px;
        grid-template-columns: 1fr 1fr;
    }
`;