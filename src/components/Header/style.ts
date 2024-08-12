import styled from "@emotion/styled";

export const Container = styled.div`
    height: 80px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 16px;

    & > div:first-of-type {
        display: flex;
        align-items: center;
        justify-content: start;
        text-align: start;
        text-wrap: nowrap;
    }

    & > div:nth-child(2) {
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        font-size: 24px;
        font-weight: bold;
        text-wrap: nowrap;
    }

    & > div:nth-child(3) {
        display: flex;
        align-items: center;
        justify-content: end;
        text-align: end;
        text-wrap: nowrap;
    }
`;