import styled from "@emotion/styled";
import {lighten} from "polished";

export const Container = styled.div`
    width: 100%;
    height: 100%;
    padding: 12px 24px;

    & > div:first-of-type {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        margin-bottom: 20px;

        input {
            display: none;
        }

        input[type="radio"]:checked + label {
            color: ${({theme}) => theme.colors.font.primary};
            border: 1px solid ${({theme}) => theme.colors.line.primary};
            background-color: ${({theme}) => theme.colors.button.approval};
        }

        label {
            width: 100%;
            height: 80px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            border: 1px solid ${({theme}) => theme.colors.line.main};
            border-radius: 8px;
            padding: 0 16px;
            cursor: pointer;
            color: ${({theme}) => theme.colors.font.sub};
            transition: all 0.2s ease-in-out 0s;

            &:hover {
                color: ${({theme}) => lighten(0.1, theme.colors.font.primary)};
                border: 1px solid ${({theme}) => lighten(0.1, theme.colors.line.primary)};
            }
        }
    }
`;