import styled from "@emotion/styled";
import {useThemeStore} from "@store/useThemeStore.ts";
import {darken, lighten} from "polished";

const setDirection = (isMine: boolean) => {
    return isMine ? "right: -20px;" : "left: -20px;";
};

const setBorder = (isMine: boolean) => {
    return isMine ?
        "border-right: 22px solid transparent;" + "border-left: 0 solid transparent;"
        : "border-left: 22px solid transparent; " + "border-right: 0 solid transparent;";
};

export const Container = styled.div<{isMine: boolean}>`
    display: flex;
    gap: 32px;
    ${({isMine}) => isMine ? "flex-direction: row-reverse;" : "flex-direction: row;"};
    
    & > div {
        background-color: ${({theme}) => {
            const {isDarkMode} = useThemeStore();
            return isDarkMode ? theme.colors.button.second : lighten(0.05, theme.colors.button.second);
        }};
        width: 40px;
        height: 40px;
        overflow: hidden;
        border-radius: 50%;
        
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    
    p {
        position: relative;
        max-width: 75%;
        background-color: ${({theme, isMine}) => {
            const {isDarkMode} = useThemeStore();
            if (isMine) {
                return theme.colors.button.approval;
            }
            return isDarkMode ? theme.colors.button.third : theme.colors.bg.main;
        }};
        padding: 14px 18px;
        margin: 0;
        border-radius: 12px;
        font-size: 1.15rem;
        color: ${({theme}) => {
            const {isDarkMode} = useThemeStore();
            return isDarkMode ? lighten(0.2, theme.colors.font.sub) : darken(0.2, theme.colors.font.sub);
        }});
        line-height: 1.5;
        word-break: keep-all;
        white-space: normal;
        overflow-wrap: break-word;
        text-align: ${({isMine}) => isMine ? "right" : "left"};
        
        &:after {
            position: absolute;
            ${({isMine}) => setDirection(isMine)} 
            top: 12px;
            content: "";
            width: 6px;
            border-top: 16px solid ${({theme, isMine}) => {
                const {isDarkMode} = useThemeStore();
                if (isMine) {
                    return theme.colors.button.approval;
                }
                return isDarkMode ? theme.colors.button.third : theme.colors.bg.main;
            }};
            border-bottom: 0 solid transparent;
            ${({isMine}) => setBorder(isMine)};
        }

        a {
            color: ${({theme}) => theme.colors.font.primary};
            text-decoration: underline;
        }
    }
`;