import styled from "@emotion/styled";
import {Link} from "react-router-dom";


export const Container = styled(Link)`
    width: 100%;
    height: 100%;
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
        & > div:first-of-type {
            box-shadow: 0 0 10px ${({theme}) => theme.colors.bg.shadow};
        }

        svg {
            fill: ${({theme}) => theme.colors.font.main};
            transform: scale(1.05);
        }
    }
`;

