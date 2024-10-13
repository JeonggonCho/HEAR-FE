import styled from "@emotion/styled";
import {Link} from "react-router-dom";
import {darken, lighten} from "polished";
import {useThemeStore} from "@store/useThemeStore.ts";

export const Container = styled(Link)`
    width: 100%;
    display: inline-block;
    padding: 14px;
    transition: all 0.2s ease-in-out 0s;
    background-color: ${({theme}) => theme.colors.bg.main};
    border-radius: 12px;

    h3 {
        width: 100%;
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
        margin-top: 12px;
            //border-top: 1px solid ${({theme}) => theme.colors.line.main};
    }

    &:hover {
        h3 {
            color: ${({theme}) => theme.colors.font.primary};
        }
    }

    & > div:first-of-type {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 40px;
        margin-bottom: 16px;
    }

    & > div:last-of-type {
        display: flex;
        align-items: center;
        justify-content: space-between;
        
        & > div:last-of-type {
            display: flex;
            align-items: center;
            gap: 12px;
            
            
            // 작성일
            & > span:first-of-type {
                font-size: 0.85rem;
                color: ${({theme}) => theme.colors.font.sub};
            }
        }
    }
`;

export const TagWrapper = styled.span<{tag: "good" | "bad" | "suggest" | "machine" | "reservation" | "room" | "etc"}>`
    width: fit-content;
    font-size: 0.9rem;
    padding: 6px 8px;
    text-wrap: nowrap;
    text-align: center;
    border-radius: 6px;
    opacity: ${({tag}) => (tag === "suggest" || tag === "room") ? 0.8 : 1};
    background-color: ${({theme, tag}) => {
        const {isDarkMode} = useThemeStore();
        
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
                bgColor = isDarkMode ? darken(0.3, theme.colors.button.green) : lighten(0.4, theme.colors.button.green);
                break;
            case "room":
                bgColor = isDarkMode ? darken(0.3, theme.colors.button.green) : lighten(0.4, theme.colors.button.green);
                break;
            case "etc":
                bgColor = theme.colors.button.third;
                break;
            default:
                bgColor = theme.colors.button.third;
        }
        return bgColor;
    }};
    color: ${({theme, tag}) => {
        const {isDarkMode} = useThemeStore();
        if (isDarkMode) {
            return theme.colors.font.sub;
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
    gap: 8px;
    
    & > div:first-of-type {
        width: 28px;
        height: 28px;
        overflow: hidden;
        border-radius: 50%;
        background-color: ${({theme}) => theme.colors.bg.sub};
        border: 1px solid ${({theme}) => theme.colors.line.main};
        display: flex;
        align-items: center;
        justify-content: center;
        
        svg {
            fill: ${({theme}) => theme.colors.icon.fill};
        }
        
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    
    & > span:first-of-type {
        font-size: 0.9rem;
        color: ${({theme}) => theme.colors.font.sub};
    }
`;