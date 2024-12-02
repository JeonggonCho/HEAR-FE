import styled from "@emotion/styled";

export const ReservationLinksWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-gap: 12px;

    @media (max-width: 600px) {
        grid-template-columns: repeat(4, 1fr);
    }

    @media (max-width: 400px) {
        grid-template-columns: repeat(3, 1fr);
    }
`;