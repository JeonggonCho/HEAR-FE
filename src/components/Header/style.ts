import styled from "@emotion/styled";

export const Container = styled.div`
    width: 100%;
    max-width: 600px;
    height: 80px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    font-weight: bold;
    font-size: 16px;
    color: ${({theme}) => theme.colors.font.main};
    position: fixed;
    top: 0;
    left: calc((100vw - 615px) / 2);
    padding: 0 24px;
    z-index: 1;

    @media (max-width: 600px) {
        left: 0;
    }

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
        font-size: 20px;
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