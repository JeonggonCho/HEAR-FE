import styled from "@emotion/styled";
import {Link} from "react-router-dom";

export const Container = styled.div`
    width: 100%;
    padding: 18px;
    border-radius: 16px;
    background-color: white;
    border: 1px solid white;

    & > div:first-of-type {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 24px;

        img {
            width: 24px;
        }

        h3 {
            margin: 0;
        }
    }

    & > div:nth-of-type(2) {
        display: flex;
        flex-direction: column;
        gap: 14px;
    }
`;

export const Reservation = styled(Link)`
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: all 0.2s ease-in-out 0s;

    &:hover {
        & > span:first-of-type {
            color: #2B65FC;
        }
    }

    & > span:last-of-type {
        font-size: 14px;
        color: #999999;
    }
`;