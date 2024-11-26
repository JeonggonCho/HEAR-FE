import styled from "@emotion/styled";


export const Container = styled.div`
    & > div:last-of-type {
        margin: 0 24px;
        
        & > div:first-of-type,
        & > div:nth-of-type(2),
        & > div:nth-of-type(3),
        & > div:nth-of-type(4),
        & > div:nth-of-type(5) {
            margin-bottom: 16px !important;
        }

        & > div:last-of-type {
            display: grid;
            grid-gap: 16px;
            grid-template-columns: repeat(2, 1fr);
        }
    }
`;