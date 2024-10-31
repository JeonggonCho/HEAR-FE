import styled from "@emotion/styled";
import {Link} from "react-router-dom";
import {darken, lighten} from "polished";

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
    font-size: 1.5rem;
    font-weight: 500;
    color: ${({theme}) => theme.colors.font.primary};
`;

export const AlarmWrapper = styled(Link)<{darkmode: string}>`
    width: 32px;
    margin-right: 6px;
    margin-top: 2px;
    cursor: pointer;
    
    svg {
        display: inline-block;
        fill: ${({theme}) => theme.colors.icon.fill};
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: all 0.2s ease-in-out 0s;
        
        &:hover {
            fill: ${({theme, darkmode}) => darkmode === "true" ? lighten(0.2, theme.colors.icon.fill) : darken(0.2, theme.colors.icon.fill)};
        }
    }
`;

export const Container = styled.div`
    & > div:last-of-type {
        margin: 0 24px;
        
        & > div:first-of-type,
        & > div:nth-of-type(2),
        & > div:nth-of-type(3),
        & > div:nth-of-type(4),
        & > div:nth-of-type(5) {
            margin-bottom: 16px !important;
        }

        & > div:last-of-type {
            display: grid;
            grid-gap: 16px;
            grid-template-columns: repeat(2, 1fr);
        }
    }
`;