import styled from "@emotion/styled";
import {Link} from "react-router-dom";
import {useThemeStore} from "@store/useThemeStore.ts";
import {darken, lighten} from "polished";

export const LinearLinkCardWrapper = styled(Link)`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    background-color: ${({theme}) => theme.colors.bg.main};
    padding: 12px;
    border-radius: 16px;
    border: 1px solid ${({theme}) => theme.colors.bg.main};
    transition: all 0.2s ease-in-out 0s;
    
    h4 {
        margin: 0;
        color: ${({theme}) => theme.colors.font.main};
        font-weight: 500;
    }
    
    svg {
        fill: ${({theme}) => theme.colors.font.sub};
        transition: all 0.2s ease-in-out 0s;

        &:hover {
            fill: black;
            transform: scale(1.05);
        }
    }
    
    &:hover {
        border: 1px solid ${({theme}) => theme.colors.line.primary};
        background-color: ${({theme}) => {
            const {isDarkMode} = useThemeStore();
            return isDarkMode ? darken(0.05, theme.colors.button.approval) : lighten(0.02, theme.colors.button.approval)
        }};
        
        h4 {
            color: ${({theme}) => theme.colors.font.primary};
        }
    }
    
    &:active {
        transform: scale(0.8);
    }
    
    & > div:first-of-type {
        display: flex;
        align-items: center;
        gap: 20px;
    }
`;

export const LinearImgWrapper = styled.div`
    width: 60px;
    height: 60px;
    padding: 14px;
    background-color: ${({theme}) => theme.colors.bg.sub};
    border-radius: 24px;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
        width: 100%;
        height: auto;
        object-fit: cover;
    }
`;

export const GridLinkCardWrapper = styled(Link)<{disabled: boolean}>`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    transition: all 0.2s ease-in-out 0s;
    cursor: ${({disabled}) => disabled ? "not-allowed" : "pointer"};

    span {
        color: ${({theme, disabled}) => disabled ? theme.colors.font.sub : theme.colors.font.main};
        font-size: 0.85rem;
        font-weight: 400;
        text-wrap: wrap;
        word-break: keep-all;
        text-align: center;
        line-height: 1.5;
        transition: all 0.2s ease-in-out 0s;
    }

    &:hover {
        & > div {
            box-shadow: 0 0 10px ${({theme, disabled}) => disabled ? "transparent" : theme.colors.bg.shadow};
        }
        
        span {
            color: ${({theme, disabled}) => disabled ? theme.colors.font.sub : theme.colors.font.primary};
        }
    }

    &:active {
        transform: scale(${({disabled}) => disabled ? "1" : "0.8"});
    }
`;

export const GridImgWrapper = styled.div<{disabled: boolean}>`
    width: 60px;
    height: 60px;
    padding: 14px;
    background-color: ${({theme}) => theme.colors.bg.main};
    border-radius: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease-in-out 0s;
    
    img {
        width: 100%;
        height: auto;
        object-fit: cover;
        filter: grayscale(${({disabled}) => disabled ? "1" : "0"});
        opacity: ${({disabled}) => disabled ? "0.2" : "1"};
    }
`;