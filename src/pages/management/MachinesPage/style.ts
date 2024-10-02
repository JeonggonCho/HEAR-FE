import styled from "@emotion/styled";

export const Container = styled.div`
    & > div:first-of-type {
        background-color: ${({theme}) => theme.colors.bg.main} !important;
        box-shadow: 0 10px 10px -8px ${({theme}) => theme.colors.bg.shadow};
    }
`;