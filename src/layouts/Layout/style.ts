import styled from "@emotion/styled";

export const Container = styled.main`
    width: 100%;
    max-width: 600px;
    height: 100%;
    margin: auto;
`;

export const OutletWrapper = styled.section`
    width: 100%;
    min-height: 100vh;
    padding: 90px 24px 100px;
    box-shadow: 0 0 15px lightgray;
    background-color: #F2F4F6;

    & > div:first-of-type {
        & > div:first-of-type {
            background-color: #F2F4F6;
        }
    }
`;