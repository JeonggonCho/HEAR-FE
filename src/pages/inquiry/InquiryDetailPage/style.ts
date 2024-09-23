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

export const InquiryInfoWrapper = styled.div`
    width: calc(100% + 48px);
    margin-left: -24px;
    padding-top: 12px;
    background-color: ${({theme}) => theme.colors.bg.main};

    & > div:first-of-type {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-bottom: 24px;
        margin-right: 24px;
        margin-left: 24px;

        & > span {
            display: block;
            width: fit-content;
            font-size: 14px;
            padding: 6px 8px;
            text-wrap: nowrap;
            background-color: ${({theme}) => {
                const {isDarkMode} = useThemeStore();
                return isDarkMode ? theme.colors.button.third : lighten(0.1, theme.colors.button.second);
            }};
            border-radius: 6px;
            color: ${({theme}) => {
                const {isDarkMode} = useThemeStore();
                return isDarkMode ? lighten(0.1, theme.colors.font.sub) : darken(0.1, theme.colors.font.sub);
            }};
        }

        h2 {
            margin: 0;
            font-weight: 500;
            text-wrap: wrap;
            word-break: break-all;
            line-height: 1.2;
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
    }

    hr {
        border: none;
        border-top: 1px solid ${({theme}) => theme.colors.line.main};
        margin: 24px 0;
    }
`;