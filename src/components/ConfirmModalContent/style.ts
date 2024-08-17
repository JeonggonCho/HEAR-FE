import styled from "@emotion/styled";

export const Container = styled.div`
    width: 100%;

    & > p:first-child {
        text-align: center;
        font-size: 20px;
        font-weight: bold;
        margin: 28px 0 32px;
    }

    & > p:nth-child(2) {
        text-align: center;
        word-break: keep-all;
        text-wrap: balance;
        line-height: 1.5;
        font-size: 14px;
        margin: 0 0 32px;
    }

    & > div:last-child {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
    }
`;