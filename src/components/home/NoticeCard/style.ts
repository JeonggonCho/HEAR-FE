import styled from "@emotion/styled";
import {Link} from "react-router-dom";

export const Container = styled.div`
    margin-top: 8px;
    width: 100%;
    background-color: ${({theme}) => theme.colors.bg.main};
    border-radius: 16px;
    padding: 12px 14px;
    transition: all 0.2s ease-in-out 0s;
    border: 1px solid ${({theme}) => theme.colors.bg.main};
    display: flex;
    align-items: center;
`;

export const More = styled(Link)`
    display: flex;
    align-items: center;
    text-wrap: nowrap;
    font-size: 0.87rem;
    margin-left: 28px;
    color: ${({theme}) => theme.colors.font.sub};
    transition: all 0.2s ease-in-out 0s;
    
    &:hover {
        color: ${({theme}) => theme.colors.font.main};
        
        svg {
            fill: ${({theme}) => theme.colors.font.main};
            transform: scale(1.05);
        }
    }
    
    svg {
        fill: ${({theme}) => theme.colors.font.sub};
        transition: all 0.2s ease-in-out 0s;
    }
`;

export const Notice = styled(Link)`
    transition: all 0.2s ease-in-out 0s;
    display: block;
    width: 100%;
    
    & > span:first-of-type {
        display: block;
        width: 100%;
        font-size: 0.9rem;
        line-height: 1.2;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: ${({theme}) => theme.colors.font.main};
    }
    
    &:hover {
        span:first-of-type {
            color: ${({theme}) => theme.colors.font.primary};
        }
    }
`;

export const ImgWrapper = styled.div<{valid: boolean}>`
    width: 24px;
    max-width: 24px;
    min-width: 24px;
    height: auto;
    overflow: hidden;
    margin-right: 12px;
    flex-grow: 1;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        opacity: ${({valid}) => valid ? "1" : "0.5"};
        filter: ${({valid}) => valid ? "" : "grayscale(100%)"};
    }
`;

export const NoticesWrapper = styled.div`
    height: 20px;
    overflow: hidden;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const EmptyNotice = styled.span`
    width: 100%;
    color: ${({theme}) => theme.colors.font.placeholder};
    display: inline-block;
    text-align: center;
    margin-left: -20px;
    margin-top: 1px;
`;