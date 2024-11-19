import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { lighten } from "polished";
import { css, Theme } from "@emotion/react";

const commonStyles = (theme: Theme) => css`
    position: fixed;
    bottom: 112px;
    right: calc((100vw - 600px) / 2 + 32px);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background-color: ${theme.colors.button.primary};
    transition: all 0.2s ease-in-out 0s;
    cursor: pointer;

    &:hover {
        background-color: ${lighten(0.1, theme.colors.button.primary)};
        transform: scale(1.05);
    }

    &:active {
        transform: scale(0.8);
    }

    @media (max-width: 600px) {
        right: 32px;
    }
`;

export const LinkWrapper = styled(Link)`
    ${({ theme }) => commonStyles(theme)}
`;

export const ButtonWrapper = styled.button`
    border: none;
    ${({ theme }) => commonStyles(theme)}
`;
