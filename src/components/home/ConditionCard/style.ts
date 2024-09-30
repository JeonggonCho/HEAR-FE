import styled from "@emotion/styled";
import {Link} from "react-router-dom";

export const Container = styled(Link)`
    width: 100%;
    padding: 12px 18px;
    border-radius: 16px;
    background-color: ${({theme}) => theme.colors.bg.main};
    transition: all 0.2s ease-in-out 0s;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid ${({theme}) => theme.colors.bg.main};

    & > div:first-of-type {
        display: flex;
        align-items: center;
        gap: 10px;

        img {
            width: 32px;
        }
    }

    h3 {
        color: ${({theme}) => theme.colors.font.main};
        font-weight: 500;
        transition: all 0.2s ease-in-out 0s;
    }

    svg {
        fill: ${({theme}) => theme.colors.font.sub};
        transition: all 0.2s ease-in-out 0s;
    }
    
    &:hover {
        box-shadow: 0 0 10px ${({theme}) => theme.colors.bg.shadow};
        
        h3 {
            color: ${({theme}) => theme.colors.font.primary};
        }
        
        svg {
            fill: ${({theme}) => theme.colors.font.main};
            transform: scale(1.05);
        }
    }
    
    &:active {
        transform: scale(0.9);
    }
`;