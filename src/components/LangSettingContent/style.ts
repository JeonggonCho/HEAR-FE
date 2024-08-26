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
            color: #2B65FC;
            border: 1px solid #2B65FC;
            background-color: #F0F4FF;
        }

        label {
            width: 100%;
            height: 80px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            border: 1px solid #E2E2E2;
            border-radius: 8px;
            padding: 0 16px;
            cursor: pointer;
            color: #999999;
            transition: all 0.2s ease-in-out 0s;

            &:hover {
                color: ${lighten(0.1, "#2B65FC")};
                border: 1px solid ${lighten(0.1, "#2B65FC")};
            }
        }
    }
`;