import styled from "@emotion/styled";
import {darken, lighten} from "polished";


export const NoticeInfoWrapper = styled.div`
    width: 100%;
    padding: 12px 24px 24px 24px;
    background-color: ${({theme}) => theme.colors.bg.main};
    border-bottom: 1px solid ${({theme}) => theme.colors.line.main};
`;

export const NoticeTitleWrapper = styled.h2`
    font-size: 1.25rem;
    font-weight: 500;
    line-height: 1.5;
    color: ${({theme}) => theme.colors.font.main};
    margin: 0 0 12px;
    word-break: keep-all;
    white-space: normal;
    overflow-wrap: break-word;
`;

export const DateAndCountsWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    
    div {
        display: flex;
        align-items: center;

        svg {
            width: 16px;
            fill: ${({theme}) => theme.colors.icon.fill};
        }
    }

    span {
        font-size: 0.87rem;
        color: ${({theme}) => theme.colors.font.sub};
    }
`;

export const NoticeContent = styled.p<{darkmode: string}>`
    font-size: 1.15rem;
    color: ${({theme, darkmode}) => darkmode === "true" ? lighten(0.2, theme.colors.font.sub) : darken(0.3, theme.colors.font.sub)};
    line-height: 1.5;
    word-break: keep-all;
    white-space: normal;
    overflow-wrap: break-word;
    margin: 24px 24px 56px;

    a {
        color: ${({theme}) => theme.colors.font.primary};
        text-decoration: underline;
    }
`;