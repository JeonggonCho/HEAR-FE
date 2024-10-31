import styled from "@emotion/styled";
import {Link} from "react-router-dom";

export const Container = styled(Link)`
    width: 100%;
    background-color: ${({theme}) => theme.colors.bg.main};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 16px;
    border: 1px solid ${({theme}) => theme.colors.bg.main};
    padding: 18px;
    transition: all 0.2s ease-in-out 0s;

    h3 {
        margin: 4px 0 0;
        font-weight: 500;
        text-wrap: wrap;
        word-break: keep-all;
        line-height: 1.3;
        color: ${({theme}) => theme.colors.font.main};
    }

    &:hover {
        box-shadow: 0 0 10px ${({theme}) => theme.colors.bg.shadow};

        svg {
            fill: ${({theme}) => theme.colors.font.main};
            transform: scale(1.05);
        }
        
        & > div:last-of-type {
            color: ${({theme}) => theme.colors.font.main};
        }
    }

    & > div:first-of-type {
        width: 100%;
        display: flex;
        gap: 16px;

        img {
            width: 20px;
        }
        
        @media (max-width: 600px) {
            flex-direction: row-reverse;
            justify-content: space-between;
            align-items: start;
        }
    }

    & > div:last-of-type {
        display: flex;
        align-items: center;
        justify-content: end;
        font-size: 0.87rem;
        color: ${({theme}) => theme.colors.font.sub};
        text-wrap: nowrap;
        transition: all 0.2s ease-in-out 0s;
    }
`;