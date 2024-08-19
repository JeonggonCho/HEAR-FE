import styled from "@emotion/styled";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 60vh;

    p {
        color: #999999;
        margin: 24px 0 0;
        text-align: center;
        text-wrap: balance;
        word-break: keep-all;
    }

    & > p:first-child {
        font-size: 18px;
    }
`;