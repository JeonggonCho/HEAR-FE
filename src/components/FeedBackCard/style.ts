import styled from "@emotion/styled";
import {Link} from "react-router-dom";

export const Container = styled(Link)`
    width: 100%;
    height: 132px;
    border-radius: 16px;
    background-color: ${({theme}) => theme.colors.bg.main};
    padding: 18px;
    cursor: pointer;
    transition: all 0.2s ease-in-out 0s;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 1px solid ${({theme}) => theme.colors.bg.main};
    
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
    
    h3 {
        color: ${({theme}) => theme.colors.font.main};
        font-weight: 500;
        line-height: 1.5;
        margin: 0;
    }
    
    & > div:nth-of-type(1) {
        display: flex;
        align-items: center;
        justify-content: end;
    }

    svg {
        color: ${({theme}) => theme.colors.font.sub};
        transition: all 0.2s ease-in-out 0s;
    }
`;