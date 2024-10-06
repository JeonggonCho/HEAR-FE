import styled from "@emotion/styled";
import {Link} from "react-router-dom";
import {useThemeStore} from "@store/useThemeStore.ts";
import {darken, lighten} from "polished";

export const Container = styled(Link)`
    width: 100%;
    display: inline-block;
    padding: 20px 8px;
    transition: all 0.2s ease-in-out 0s;

    h3 {
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
        border-top: 1px solid ${({theme}) => theme.colors.line.main};
    }
    
    &:hover {
        transform: translateY(-4px);
        
        h3 {
            width: 100%;
            color: ${({theme}) => theme.colors.font.primary};
        }
    }
    
    & > div:first-of-type {
        display: flex;
        flex-direction: column;
        margin-bottom: 24px;

        & > span {
            margin-left: -4px;
            margin-bottom: 8px;
            width: fit-content;
            font-size: 0.9rem;
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
        
        div {
            width: 100%;
            display: flex;
            align-items: center;
            gap: 24px;
        }
    }
    
    & > div:last-of-type {
        display: flex;
        align-items: center;
        justify-content: space-between;
        
        & > span:first-of-type {
            font-size: 1rem;
            color: ${({theme}) => theme.colors.font.sub};
        }
        
        & > span:last-of-type {
            font-size: 0.9rem;
            color: ${({theme}) => theme.colors.font.sub};
        }
    }
`;