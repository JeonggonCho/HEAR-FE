import styled from "@emotion/styled";


export const DeleteSelectedReservationsBtnWrapper = styled.div`
    & > span {
        font-size: 0.9rem;
        text-decoration: underline;
        color: ${({theme}) => theme.colors.font.sub};
        cursor: pointer;
        transition: all 0.2s ease-in-out 0s;

        &:hover {
            color: ${({theme}) => theme.colors.font.main};
        }
    }
`;