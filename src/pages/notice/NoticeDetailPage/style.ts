import styled from "@emotion/styled";
import {darken, lighten} from "polished";
import {useThemeStore} from "@store/useThemeStore.ts";

export const Container = styled.div`
    width: 100%;
    
    & > div:first-of-type {
        width: 100%;
        background-color: ${({theme}) => theme.colors.bg.main} !important;
    }

    p {
        font-size: 18px;
        color: ${({theme}) => {
            const {isDarkMode} = useThemeStore();
            return isDarkMode ? lighten(0.2, theme.colors.font.sub) : darken(0.2, theme.colors.font.sub);
        }});
        line-height: 1.5;
        word-break: keep-all;
        white-space: normal;
        overflow-wrap: break-word;
    }
;


    a {
        color: ${({theme}) => theme.colors.font.primary};
        text-decoration: underline;
    }
}
`;

export const NoticeInfoWrapper = styled.div`
    width: calc(100% + 48px);
    margin-left: -24px;
    padding-top: 12px;
    background-color: ${({theme}) => theme.colors.bg.main};

    h2 {
        font-size: 24px;
        font-weight: 500;
        line-height: 1.5;
        color: ${({theme}) => theme.colors.font.main};
        margin: 0 0 4px 24px;
        word-break: keep-all;
        white-space: normal;
        overflow-wrap: break-word;
    }

    & > div:first-of-type {
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        margin-left: 24px;
        margin-right: 24px;

        span {
            font-size: 16px;
            color: ${({theme}) => theme.colors.font.sub};
        }
    }

    hr {
        width: 100%;
        display: block;
        margin-top: 14px;
        border: none;
        border-top: 1px solid ${({theme}) => theme.colors.line.main};
    }
`;