import styled from "@emotion/styled";
import {lighten} from "polished";

export const Container = styled.div`
    width: 100%;
    padding: 16px;
    border-radius: 16px;
    background-color: #F0F4FF;
    color: #2B65FC;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    gap: 16px;

    & > div:first-child, & > div:last-child {
        text-align: center;
        line-height: 1.2;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 6px;

        p {
            margin: 0 0 -2px;
            font-size: 16px;
        }

        span {
            font-size: 12px;
        }

        h3 {
            font-size: 18px;
            margin: 0;
        }
    }

    & > div:nth-child(2) {
        min-height: 60px;
        border-left: 1px solid ${lighten(0.3, "#2B65FC")};
    }
`;