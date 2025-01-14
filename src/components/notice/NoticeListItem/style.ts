import styled from "@emotion/styled";
import {Link} from "react-router-dom";

export const Container = styled(Link)`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 8px;
    transition: all 0.2s ease-in-out 0s;

    & > div:first-of-type {
        width: 90%;
        display: flex;
        flex-direction: column;
        gap: 12px;
    }
    
    h3 {
        color: ${({theme}) => theme.colors.font.main};
        margin: 0;
        font-size: 1.15rem;
        font-weight: 400;
        line-height: 1.2;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    
    & + & {
        border-top: 1px solid ${({theme}) => theme.colors.line.main};
    }

    &:hover {
        transform: translateY(-4px);

        h3 {
            color: ${({theme}) => theme.colors.font.primary};
        }
    }
`;

export const NoticeInfoWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;

    div {
        display: flex;
        align-items: center;

        svg {
            width: 16px;
            fill: ${({theme}) => theme.colors.icon.fill};
        }
    }

    span {
        font-size: 0.9rem;
        color: ${({theme}) => theme.colors.font.sub};
    }
`;