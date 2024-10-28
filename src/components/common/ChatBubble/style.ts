import styled from "@emotion/styled";
import {darken, lighten} from "polished";

const setDirection = (mine: string) => {
    return mine === "true" ? "right: -20px;" : "left: -20px;";
};

const setBorder = (mine: string) => {
    return mine === "true" ?
        "border-right: 22px solid transparent;" + "border-left: 0 solid transparent;"
        : "border-left: 22px solid transparent; " + "border-right: 0 solid transparent;";
};

export const Container = styled.div<{mine: string, darkmode: string}>`
    display: flex;
    gap: 32px;
    ${({mine}) => mine === "true" ? "flex-direction: row-reverse;" : "flex-direction: row;"};
    
    & > div {
        background-color: ${({theme, darkmode}) => darkmode === "true" ? theme.colors.button.second : lighten(0.05, theme.colors.button.second)};
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
        background-color: ${({theme, mine, darkmode}) => {
            if (mine === "true") {
                return theme.colors.button.approval;
            }
            return darkmode === "true" ? theme.colors.button.third : theme.colors.bg.main;
        }};
        padding: 14px 18px;
        margin: 0;
        border-radius: 12px;
        font-size: 1.15rem;
        color: ${({theme, darkmode}) => darkmode === "true" ? lighten(0.2, theme.colors.font.sub) : darken(0.2, theme.colors.font.sub)});
        line-height: 1.5;
        word-break: keep-all;
        white-space: normal;
        overflow-wrap: break-word;
        text-align: ${({mine}) => mine === "true" ? "right" : "left"};
        
        &:after {
            position: absolute;
            ${({mine}) => setDirection(mine)} 
            top: 12px;
            content: "";
            width: 6px;
            border-top: 16px solid ${({theme, mine, darkmode}) => {
                if (mine === "true") {
                    return theme.colors.button.approval;
                }
                return darkmode === "true" ? theme.colors.button.third : theme.colors.bg.main;
            }};
            border-bottom: 0 solid transparent;
            ${({mine}) => setBorder(mine)};
        }

        a {
            color: ${({theme}) => theme.colors.font.primary};
            text-decoration: underline;
        }
    }
`;