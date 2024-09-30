import styled from "@emotion/styled";
import {Link} from "react-router-dom";
import {lighten} from "polished";

export const Container = styled(Link)`
    position: fixed;
    bottom: 112px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background-color: ${({theme}) => theme.colors.button.primary};
    transition: all 0.2s ease-in-out 0s;

    &:hover {
        background-color: ${({theme}) => lighten(0.1, theme.colors.button.primary)};
        transform: scale(1.05);
    }

    &:active {
        transform: scale(0.8);
    }

    @media (max-width: 600px) {
        right: 32px;
    }

    @media (min-width: 600px) {
        right: calc((100vw - 600px) / 2 + 32px);
    }
`;