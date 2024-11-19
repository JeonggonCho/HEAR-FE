import styled from "@emotion/styled";
import {useThemeStore} from "@store/useThemeStore.ts";

export const Container = styled.div`
    color: ${({theme}) => theme.colors.font.main};
    
    div + div {
        margin-top: 48px;
    }

    p + div, section {
        margin-bottom: 72px;
    }
    
    div + span {
        margin-top: 56px;
    }
    
    span + div {
        margin-top: 24px;
    }

    div + p {
        margin-top: 72px;
    }

    h3 {
        color: ${({theme}) => theme.colors.font.primary};
        font-size: 1.25rem;
        font-weight: 500;
    }

    h4 {
        font-size: 1rem;
        color: ${({theme}) => theme.colors.font.sub};
        margin: 0 0 8px;
        font-weight: 400;
    }

    p {
        font-weight: 500;
        line-height: 1.5;
        margin: 0 0 20px;
        font-size: 1.15rem;
        text-wrap: wrap;
        word-break: ${() => {
            const {lang} = useThemeStore();
            return lang === "ch" ? "break-all" : "keep-all";
        }};
    }

    span {     
        display: block;
        line-height: 1.5;
        margin: 8px 0;
    }

    a {
        color: ${({theme}) => theme.colors.font.primary};
        text-decoration: underline;
        margin: 0 18px;
        font-size: 1rem;
    }
`;
