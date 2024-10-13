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
        font-size: 1.15rem;
        color: ${({theme}) => {
            const {isDarkMode} = useThemeStore();
            return isDarkMode ? lighten(0.2, theme.colors.font.sub) : darken(0.3, theme.colors.font.sub);
        }};
        line-height: 1.5;
        word-break: keep-all;
        white-space: normal;
        overflow-wrap: break-word;
        margin: 24px;
    }
;


    a {
        color: ${({theme}) => theme.colors.font.primary};
        text-decoration: underline;
    }
}
`;

export const NoticeInfoWrapper = styled.div`
    width: 100%;
    padding: 12px 24px 24px 24px;
    background-color: ${({theme}) => theme.colors.bg.main};
    border-bottom: 1px solid ${({theme}) => theme.colors.line.main};

    h2 {
        font-size: 1.25rem;
        font-weight: 500;
        line-height: 1.5;
        color: ${({theme}) => theme.colors.font.main};
        margin: 0 0 12px;
        word-break: keep-all;
        white-space: normal;
        overflow-wrap: break-word;
    }

    & > div:first-of-type {
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;

        span {
            font-size: 0.87rem;
            color: ${({theme}) => theme.colors.font.sub};
        }
    }
`;