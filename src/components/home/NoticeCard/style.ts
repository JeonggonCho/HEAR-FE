import styled from "@emotion/styled";
import {Link} from "react-router-dom";


export const ImgWrapper = styled.div<{valid: boolean}>`
    width: 24px;
    max-width: 24px;
    min-width: 24px;
    height: auto;
    overflow: hidden;
    margin-right: 20px;
    flex-grow: 1;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        opacity: ${({valid}) => valid ? "1" : "0.5"};
        filter: ${({valid}) => valid ? "" : "grayscale(100%)"};
    }
`;

export const RollingWrapper = styled.div<{rollingHeight: string}>`
    width: 100%;
    height: ${({rollingHeight}) => rollingHeight};
    overflow: hidden;
`;

export const RollingContent = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Notice = styled(Link)`
    width: 100%;
    font-size: 0.9rem;
    color: ${({theme}) => theme.colors.font.main};
    line-height: 1.2;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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

export const EmptyNotice = styled.span`
    width: 100%;
    color: ${({theme}) => theme.colors.font.placeholder};
    display: inline-block;
    text-align: center;
    margin-left: -20px;
    margin-top: 1px;
`;