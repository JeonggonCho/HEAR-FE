import styled from "@emotion/styled";
import {Link} from "react-router-dom";

export const Container = styled.div`
    width: 100%;
    padding: 18px;
    border-radius: 16px;
    background-color: ${({theme}) => theme.colors.bg.main};
    border: 1px solid ${({theme}) => theme.colors.bg.main};
    
    & > div:first-of-type {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 24px;
        
        img {
            width: 24px;
        }

        h3 {
            color: ${({theme}) => theme.colors.font.main};
            font-weight: 500;
            margin: 0;
        }
    }

    & > div:nth-of-type(2) {
        display: flex;
        flex-direction: column;
        gap: 14px;
    }
`;

export const Usage = styled(Link)`
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: all 0.2s ease-in-out 0s;
    
    & > span:first-of-type {
        color: ${({theme}) => theme.colors.font.main};
    }

    & > span:last-of-type {
        color: ${({theme}) => theme.colors.font.sub};
    }

    &:hover {
        & > span:first-of-type {
            color: ${({theme}) => theme.colors.font.primary};
        }
    }

    & > span:last-of-type {
        font-size: 0.9rem;
        color: ${({theme}) => theme.colors.font.sub};
    }
`;