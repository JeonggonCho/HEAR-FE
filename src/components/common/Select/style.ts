import styled from "@emotion/styled";
import {lighten} from "polished";

export const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
    
    & > label:first-of-type {
        color: ${({theme}) => theme.colors.font.main};
        margin-left: 4px;
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
    
    input[type='radio']:disabled + label {
        background-color: ${({theme}) => theme.colors.bg.sub};
        color: ${({theme}) => theme.colors.font.sub};
        cursor: not-allowed;
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
            border: 1px solid ${({theme}) => theme.colors.font.sub};
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
                width: 18px;
                fill: white;
            }
        }
    }

    input[type='checkbox']:checked + label {
        color: ${({theme}) => theme.colors.font.main};
        
        & > div {
            border: 2px solid ${({theme}) => theme.colors.line.primary};
            background-color: ${({theme}) => theme.colors.button.primary};
            
            svg {
                display: block;
            }
        }
    }
    
    input[type='checkbox']:disabled + label {
        cursor: not-allowed;
        color: ${({theme}) => theme.colors.font.placeholder};

        & > div {
            border: 1px solid ${({theme}) => theme.colors.line.main};
            background-color: ${({theme}) => theme.colors.bg.sub};
        }
    }
`;

export const LabelWrapper = styled.label<{darkmode: string, lang: "en" | "ch" | "ko"}>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 56px;
    background-color: ${({theme}) => theme.colors.bg.main};
    color: ${({theme}) => theme.colors.font.sub};
    border-radius: 8px;
    border: 1px solid ${({theme, darkmode}) => darkmode === "true" ? lighten(0.05, theme.colors.line.main) : theme.colors.line.main};
    cursor: pointer;
    transition: all 0.2s ease-in-out 0s;
    font-size: ${({lang}) => lang === "en" ? "0.9rem" : "1rem"};
`;

