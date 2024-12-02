import styled from "@emotion/styled";
import {Link} from "react-router-dom";


export const Container = styled(Link)`
    width: 100%;
    height: 100%;
    display: block;

    & > div:first-of-type {
        height: 100%;
        transition: all 0.2s ease-in-out 0s;
    }
    
    svg {
        fill: ${({theme}) => theme.colors.font.sub};
        transition: all 0.2s ease-in-out 0s;
    }
    
    &:hover {
        & > div:first-of-type {
            box-shadow: 0 0 10px ${({theme}) => theme.colors.bg.shadow};
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

export const CardTitleWrapper = styled.h3`
    font-size: 1.15rem;
    text-wrap: wrap;
    word-break: keep-all;
    color: ${({theme}) => theme.colors.font.main};
    font-weight: 500;
    line-height: 1.5;
    margin: 0;
`;