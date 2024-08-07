import styled from "@emotion/styled";

export const Container = styled.div`
    height: 80px;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 18px;

    & > div:first-of-type {
        text-align: start;
        flex-grow: 1;
    }

    & > div:nth-child(2) {
        text-align: center;
        flex-grow: 1;
    }

    & > div:nth-child(3) {
        text-align: end;
        flex-grow: 1;
    }
`;