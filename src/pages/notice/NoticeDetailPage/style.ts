import styled from "@emotion/styled";
import {darken, lighten} from "polished";
import {useThemeStore} from "@store/useThemeStore.ts";

export const Container = styled.div`
    width: 100%;

    h2 {
        font-size: 24px;
        line-height: 1.5;
        color: ${({theme}) => theme.colors.font.main};
        margin: 0 0 4px;
        word-break: keep-all;
        white-space: normal;
        overflow-wrap: break-word;
    }

    & > div:nth-of-type(2) {
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;

        span {
            font-size: 16px;
            color: ${({theme}) => theme.colors.font.sub};
        }
    }

    hr {
        display: block;
        margin: 14px 0;
        border: none;
        border-top: 1px solid ${({theme}) => theme.colors.line.main};
    }

    p {
        font-size: 18px;
        color: ${({theme}) => {
            const {isDarkMode} = useThemeStore();
            return isDarkMode ? lighten(0.2, theme.colors.font.sub) : darken(0.2, theme.colors.font.sub);
        }})
    }
;
    line-height: 1.5;
    word-break: keep-all;
    white-space: normal;
    overflow-wrap: break-word;

    a {
        color: ${({theme}) => theme.colors.font.primary};
        text-decoration: underline;
    }
}
`;