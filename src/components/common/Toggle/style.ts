import styled from "@emotion/styled";
import {lighten} from "polished";

export const Container = styled.button<{status: boolean, darkmode: string}>`
    width: 52px;
    height: 32px;
    padding: 2px;
    display: flex;
    align-items: center;
    border: none;
    border-radius: 16px;
    background-color: ${({theme, status, darkmode}) => {
        return darkmode === "true" && status === false ? theme.colors.button.second 
                : darkmode === "false" && status === false ? lighten(0.1, theme.colors.button.second) 
                        : status === true ? theme.colors.button.green 
                                : null;
    }};
    cursor: pointer;
    overflow: hidden;
    transition: all 0.2s ease-in-out;

    & > div:first-of-type {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background-color: white;
        margin-left: ${({status}) => status === true ? "20px": "0px"};
        box-shadow: 0 0 5px ${({theme}) => theme.colors.bg.shadow};
        transition: all 0.2s ease-in-out;
    }
`;