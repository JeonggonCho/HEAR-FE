import styled from "@emotion/styled";

export const Container = styled.div`
    width: 100%;
    max-width: 600px;
    height: 80px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    font-weight: 500;
    font-size: 16px;
    color: ${({theme}) => theme.colors.font.main};
    background-color: ${({theme}) => theme.colors.bg.sub};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    padding: 0 24px;
    border-left: 1px solid ${({theme}) => theme.colors.line.main};
    border-right: 1px solid ${({theme}) => theme.colors.line.main};
    z-index: 3;

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
        font-weight: 500;
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