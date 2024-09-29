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
`;

export const RadioListWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;

    & > div {
        width: 100%;
    }
`;

export const CheckboxListWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 8px;
    margin-top: 4px;
    
    @media (max-width: 600px) {
        grid-template-columns: 1fr 1fr;
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

export const CheckboxWrapper = styled.div`
    position: relative;
    width: fit-content;


    & > input {
        display: none;
    }

    & > label {
        font-weight: 400;
        display: flex;
        align-items: center;
        border-radius: 8px;
        width: 100%;
        font-size: 1.15rem;
        padding: 8px 8px 8px 32px;
        color: ${({theme}) => theme.colors.font.sub};
        cursor: pointer;

        & > div:last-of-type {
            border: 1px solid ${({theme}) => theme.colors.line.main};
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 20px;
            height: 20px;
            position: absolute;
            left: 0;

            svg {
                display: none;
                width: 20px;
                fill: ${({theme}) => theme.colors.font.primary};
            }
        }
    }

    input[type='checkbox']:checked + label {
        color: ${({theme}) => theme.colors.font.main};
        
        & > div {
            border: 1px solid ${({theme}) => theme.colors.line.primary};
            background-color: ${({theme}) => theme.colors.button.approval}
        ;
            svg {
                display: block;
            }
        }
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

