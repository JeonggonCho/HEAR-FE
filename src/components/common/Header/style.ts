import styled from "@emotion/styled";
import {css} from "@emotion/react";

export const HeaderWrapper = styled.div<{bgColor: boolean}>`
    width: 100%;
    height: 72px;
    display: flex;
    align-items: center;
    padding: 0 24px;
    font-weight: 500;
    font-size: 1rem;
    color: ${({theme}) => theme.colors.font.main};
    position: sticky;
    top: 0;
    background-color: ${({theme, bgColor}) => bgColor ? theme.colors.bg.main : theme.colors.bg.sub};
    transition: all 0.2s ease-in-out 0s;
    z-index: 3;
`;

export const headerLeft = css`
    display: flex;
    align-items: center;
    justify-content: start;
    text-align: start;
`;

export const headerCenter = css`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 1.25rem;
    font-weight: 500;
    text-wrap: nowrap;
`;

export const headerRight = css`
    display: flex;
    align-items: center;
    justify-content: end;
    text-align: end;
`;