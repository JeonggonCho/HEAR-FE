import styled from "@emotion/styled";
import {useThemeStore} from "@store/useThemeStore.ts";
import {darken, lighten} from "polished";

export const Container = styled.div`
    width: 100%;

    & > div:first-of-type {
        width: 100%;
        background-color: ${({theme}) => theme.colors.bg.main} !important;
    }

    & > div:nth-of-type(3) {
        width: 100%;
        height: 100%;
        padding: 8px 0 56px 0;
        display: flex;
        flex-direction: column;
        gap: 32px;
    }
`;

export const FeedbackInfoWrapper = styled.div`
    width: calc(100% + 48px);
    margin-left: -24px;
    padding-top: 12px;
    background-color: ${({theme}) => theme.colors.bg.main};
    
    & > div:first-of-type {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-bottom: 12px;
        margin-left: 24px;
        margin-right: 24px;

        // 제목
        h2 {
            font-size: 1.25rem;
            font-weight: 500;
            margin: 0;
            text-wrap: wrap;
            word-break: break-all;
            line-height: 1.5;
        }
    }

    & > div:last-of-type {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0 24px;
        color: ${({theme}) => theme.colors.font.sub};

        & > div {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        & > div:last-of-type {
            // 작성일
            span {
                font-size: 0.9rem;
            }
        }
    }

    hr {
        border: none;
        border-top: 1px solid ${({theme}) => theme.colors.line.main};
        margin: 12px 0;
    }
`;

export const ContentWrapper = styled.div`
    width: 100%;
    
    & > p:first-of-type {
        margin: 0;
        font-size: 1rem;
        line-height: 1.8;
        text-wrap: wrap;
        word-break: manual;
        color: ${({theme}) => {
            const {isDarkMode} = useThemeStore();
            return isDarkMode ? lighten(0.2, theme.colors.font.sub) : darken(0.3, theme.colors.font.sub);
        }};
    }
`;