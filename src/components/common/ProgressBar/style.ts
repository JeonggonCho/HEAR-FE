import styled from "@emotion/styled";
import {lighten} from "polished";

export const Container = styled.div<{total: number, current: number, darkmode: string}>`
    width: 100%;
    height: 8px;
    border-radius: 4px;
    background-color: ${({theme, darkmode}) => {
        return darkmode === "true" ? theme.colors.button.second : lighten(0.1, theme.colors.button.second);
    }};
    
    div {
        width: ${({total, current}) => `calc(${(current / total) * 100}%)`};
        height: 8px;
        border-radius: 4px;
        background-color: ${({theme}) => theme.colors.button.primary};
        transition: all 0.5s ease-in-out 0s;
    }
`;