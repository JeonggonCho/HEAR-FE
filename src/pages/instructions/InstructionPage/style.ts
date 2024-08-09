import styled from "@emotion/styled";

export const Container = styled.div`
    p {
        margin-bottom: 24px;
    }

    & > div:nth-child(3) {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 16px;
    }
`;