import styled from "@emotion/styled";
import {Link} from "react-router-dom";
import {darken, lighten} from "polished";

export const Container = styled(Link)`
    width: 100%;
    display: inline-flex;
    flex-direction: column;
    gap: 8px;
    padding: 14px 14px 8px;
    background-color: ${({theme}) => theme.colors.bg.main};
    border-radius: 12px;
    transition: transform 0.2s ease-out;
    
    & + & {
        margin-top: 12px;
    }

    &:hover {
        transform: scale(1.01);
    }

    &:active {
        transform: scale(0.98);
    }
`;

export const TagWrapper = styled.span<{tag: "good" | "bad" | "suggest" | "machine" | "reservation" | "room" | "etc", darkmode: string}>`
    width: fit-content;
    display: inline-block;
    font-size: 0.87rem;
    padding: 6px 6px;
    text-wrap: nowrap;
    text-align: center;
    border-radius: 6px;
    opacity: ${({tag}) => (tag === "suggest" || tag === "room") ? 0.8 : 1};
    background-color: ${({theme, tag, darkmode}) => {
        let bgColor;
        switch (tag) {
            case "good":
                bgColor = theme.colors.button.approval;
                break;
            case "reservation":
                bgColor = theme.colors.button.approval;
                break;
            case "bad":
                bgColor = theme.colors.button.danger;
                break;
            case "machine":
                bgColor = theme.colors.button.danger;
                break;
            case "suggest":
                bgColor = darkmode === "true" ? darken(0.3, theme.colors.button.green) : lighten(0.4, theme.colors.button.green);
                break;
            case "room":
                bgColor = darkmode === "true" ? darken(0.3, theme.colors.button.green) : lighten(0.4, theme.colors.button.green);
                break;
            case "etc":
                bgColor = theme.colors.button.third;
                break;
            default:
                bgColor = theme.colors.button.third;
        }
        return bgColor;
    }};
    color: ${({theme, tag, darkmode}) => {
        if (darkmode === "true") {
            return lighten(0.2, theme.colors.font.sub);
        }
        
        let fontColor;
        switch (tag) {
            case "good":
                fontColor = theme.colors.font.primary;
                break;
            case "reservation":
                fontColor = theme.colors.font.primary;
                break;
            case "bad":
                fontColor = theme.colors.font.danger;
                break;
            case "machine":
                fontColor = theme.colors.font.danger;
                break;
            case "suggest":
                fontColor = darken(0.15, theme.colors.button.green);
                break;
            case "room":
                fontColor = darken(0.15, theme.colors.button.green);
                break;
            case "etc":
                fontColor = theme.colors.font.sub;
                break;
            default:
                fontColor = theme.colors.font.sub;
        }
        return fontColor;
    }};
`;

export const WriterWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
    
    // 작성자 이름
    & > span:first-of-type {
        text-wrap: nowrap;
        font-size: 0.9rem;
        color: ${({theme}) => theme.colors.font.main};
    }
`;

export const TitleWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;

    h3 {
        margin: 0;
        width: 100%;
        color: ${({theme}) => theme.colors.font.main};
        font-size: 1.15rem;
        font-weight: 400;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        line-height: 1.3;
    }
`;

export const BottomWrapper = styled.div<{darkmode: string}>`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 0 4px;
    border-top: 1px solid ${({theme, darkmode}) => darkmode === "true" ? theme.colors.line.main : lighten(0.05, theme.colors.line.main)};
    font-size: 0.85rem;
    color: ${({theme}) => theme.colors.font.sub};
`;

export const InfoWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    
    & > div {
        display: flex;
        align-items: center;
        
        svg {
            fill: ${({theme}) => theme.colors.icon.fill};
            margin-top: 4px;
            width: 14px;
            height: 14px;
        }
    }
`;