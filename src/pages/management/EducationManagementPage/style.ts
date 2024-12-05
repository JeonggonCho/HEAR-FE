import styled from "@emotion/styled";
import {darken, lighten} from "polished";


export const QuestionsWrapper = styled.div`
    margin: 24px 24px 0;
    
    & > button:last-of-type {
        margin-top: 20px;
    }
`;

export const MenusWrapper = styled.div`
    width: 100%;
    padding: 8px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 72px;
    z-index: 2;
    background-color: ${({theme}) => theme.colors.bg.main};
    border-bottom: 1px solid ${({theme}) => theme.colors.line.main};
    
    & > div:first-of-type {
        width: 32px;
        height: 32px;
        overflow: hidden;
        cursor: pointer;

        svg {
            width: 100%;
            height: 100%;
            fill: ${({theme}) => theme.colors.icon.fill};
            object-fit: cover;
            transition: all 0.2s ease-in-out 0s;

            &:hover {
                fill: ${({theme}) => theme.colors.font.main};
            }
        }
    }
    
    & > div:last-of-type {
        display: flex;
        align-items: center;
        gap: 8px;
    }
`;

export const ResetButtonWrapper = styled.div<{modified: string, darkmode: string}>`
    width: 100%;
    height: 100%;
    padding: 4px 4px 4px 10px;
    border-radius: 8px;
    background-color: ${({theme, modified, darkmode}) => {
        return modified === "true" ? theme.colors.button.approval 
                : darkmode === "true" ? theme.colors.button.third
                        : darken(0.05, theme.colors.button.third);
    }};
    display: flex;
    align-items: center;
    gap: 4px;
    cursor: ${({modified}) => modified === "true" ? "pointer" : "not-allowed"};
    transition: all 0.2s ease-in-out 0s;

    span {
        font-size: 1rem;
        color: ${({theme, modified, darkmode}) => {
            return modified === "true" ? theme.colors.font.primary 
                    : darkmode === "true" ? theme.colors.font.placeholder
                            : lighten(0.2, theme.colors.font.sub);
        }};
        transition: all 0.2s ease-in-out 0s;
    }

    svg {
        width: 24px;
        height: 24px;
        fill: ${({theme, modified, darkmode}) => {
            return modified === "true" ? theme.colors.font.primary
                    : darkmode === "true" ? theme.colors.font.placeholder
                            : lighten(0.2, theme.colors.font.sub);
        }};
        object-fit: cover;
        transition: all 0.2s ease-in-out 0s;
    }
    
    &:active {
        scale: ${({modified}) => modified === "true" && 0.9};
    }
`;