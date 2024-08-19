import styled from "@emotion/styled";

export const Container = styled.div`
    height: 80px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 16px;
    position: sticky;
    top: 0;
    background-color: #F8F8F8;
    z-index: 1;

    & > div:first-of-type {
        display: flex;
        align-items: center;
        justify-content: start;
        text-align: start;
        text-wrap: nowrap;
    }

    & > div:nth-of-type(2) {
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        font-size: 24px;
        font-weight: bold;
        text-wrap: nowrap;
    }

    & > div:nth-of-type(3) {
        display: flex;
        align-items: center;
        justify-content: end;
        text-align: end;
        text-wrap: nowrap;
    }
`;