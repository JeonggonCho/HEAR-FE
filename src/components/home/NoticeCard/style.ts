import styled from "@emotion/styled";
import {Link} from "react-router-dom";

export const Container = styled.div`
    width: 100%;
    background-color: ${({theme}) => theme.colors.bg.main};
    border-radius: 16px;
    padding: 18px;
    transition: all 0.2s ease-in-out 0s;
    border: 1px solid ${({theme}) => theme.colors.bg.main};

    & > div:first-of-type {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 24px;
        
        & > div:first-of-type {
            display: flex;
            align-items: center;
            gap: 10px;

            img {
                display: flex;
                align-items: center;
                width: 32px;
            }
        }
        
        h3 {
            margin: 0;
            color: ${({theme}) => theme.colors.font.main};
            font-weight: 500;
        }
    }

    & > div:nth-of-type(2) {
        display: flex;
        flex-direction: column;
        gap: 14px;
    }
`;

export const More = styled(Link)`
    svg {
        fill: ${({theme}) => theme.colors.font.sub};
        transition: all 0.2s ease-in-out 0s;
        
        &:hover {
            fill: ${({theme}) => theme.colors.font.main};
            transform: scale(1.05);
        }
    }
`;

export const Notice = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: all 0.2s ease-in-out 0s;
    gap: 24px;
    
    & > span:first-of-type {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: ${({theme}) => theme.colors.font.main};
    }

    & > span:last-of-type {
        font-size: 0.9rem;
        color: ${({theme}) => theme.colors.font.sub};
    }
    
    &:hover {
        span:first-of-type {
            color: ${({theme}) => theme.colors.font.primary};
        }
    }
`;