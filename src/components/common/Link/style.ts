import styled from "@emotion/styled";
import {Link} from "react-router-dom";

export const TextLinkWrapper = styled(Link)<{color: "primary" | "second"}>`
    cursor: pointer;
    color: ${({color, theme}) => color === "primary" ? theme.colors.font.primary : theme.colors.font.sub};
    transition: all 0.2s ease-in-out 0s;
    width: 100%;
    margin: 28px auto 0 auto;
    display: inline-block;
    text-align: center;
`;

export const CardLinkCardWrapper = styled(Link)`
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
        transition: all 0.2s ease-in-out 0s;
    }
    
    svg {
        fill: ${({theme}) => theme.colors.font.sub};
        transition: all 0.2s ease-in-out 0s;
    }
    
    &:hover {
        h4 {
            color: ${({theme}) => theme.colors.font.primary};
        }
        
        svg {
            fill: ${({theme}) => theme.colors.font.main};
        }
    }
    
    &:active {
        transform: scale(0.95);
    }
    
    & > div:first-of-type {
        display: flex;
        align-items: center;
        gap: 20px;
    }
`;

export const CardImgWrapper = styled.div`
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

export const ButtonLinkCardWrapper = styled(Link)<{disabled: boolean, loading:string}>`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    transition: all 0.2s ease-in-out 0s;
    cursor: ${({disabled, loading}) => disabled ? "not-allowed" : loading === "true" ? "not-allowed" : "pointer"};

    span {
        color: ${({theme, disabled}) => disabled ? theme.colors.font.sub : theme.colors.font.main};
        font-size: 0.85rem;
        font-weight: 400;
        text-wrap: wrap;
        word-break: keep-all;
        text-align: center;
        line-height: 1.5;
        transition: all 0.2s ease-in-out 0s;
        visibility: ${({loading}) => loading === "true" ? "hidden" : "visible"};
    }

    &:hover {
        & > div {
            box-shadow: 0 0 10px ${({theme, disabled, loading}) => disabled ? "transparent" : loading === "true" ? "transparent" : theme.colors.bg.shadow};
        }
        
        span {
            color: ${({theme, disabled}) => disabled ? theme.colors.font.sub : theme.colors.font.primary};
        }
    }

    &:active {
        transform: scale(${({disabled}) => disabled ? "1" : "0.95"});
    }
`;

export const ButtonImgWrapper = styled.div<{disabled: boolean}>`
    width: 60px;
    height: 60px;
    padding: 14px;
    background: ${({theme}) => theme.colors.bg.main};
    background-size: 200% 100%;
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