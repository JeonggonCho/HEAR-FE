import styled from "@emotion/styled";
import {lighten} from "polished";
import {useThemeStore} from "@store/useThemeStore.ts";

export const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 6px;
    
    & > label:first-of-type {
        color: ${({theme}) => theme.colors.font.sub};
        margin-left: 6px;
    }
    
    & > div:nth-of-type(1) {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        
        div {
            width: 100%;
        }
    }
`;

export const RadioWrapper = styled.div`
    & > input {
        display: none;
    }
    
    input[type='radio']:checked + label {
        border: 1px solid ${({theme}) => theme.colors.line.primary};
        background-color: ${({theme}) => theme.colors.button.approval};
        color: ${({theme}) => theme.colors.font.primary};
    }
`;

export const LabelWrapper = styled.label`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 56px;
    background-color: ${({theme}) => theme.colors.bg.main};
    color: ${({theme}) => {
        const {isDarkMode} = useThemeStore();
        return isDarkMode ? lighten(0.5, theme.colors.font.sub) : theme.colors.font.sub;
    }};
    border-radius: 8px;
    border: 1px solid ${({theme}) => theme.colors.line.main};
    cursor: pointer;
    transition: all 0.2s ease-in-out 0s;
`;