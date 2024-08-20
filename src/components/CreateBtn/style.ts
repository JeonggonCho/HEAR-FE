import styled from "@emotion/styled";
import {Link} from "react-router-dom";
import {darken, lighten} from "polished";

export const Container = styled(Link)`
    position: fixed;
    bottom: 112px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background-color: #2B65FC;
    transition: all 0.2s ease-in-out 0s;

    &:hover {
        background-color: ${lighten(0.1, "#2B65FC")};
        transform: scale(1.05);
    }

    &:active {
        background-color: ${darken(0.1, "#2B65FC")};
        transform: scale(0.8);
    }

    @media (max-width: 600px) {
        right: 32px;
    }

    @media (min-width: 600px) {
        right: calc((100vw - 600px) / 2 + 32px);
    }
`;