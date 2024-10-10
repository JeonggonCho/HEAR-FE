import styled from "@emotion/styled";

export const Container = styled.div`
    width: 100%;
    
    & > div:first-of-type {
        background-color: ${({theme}) => theme.colors.bg.main} !important;
    }
`;

export const HeaderWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;

    h2 {
        font-weight: 500;
        font-size: 1.25rem;
    }
    
    img {
        width: 36px;
    }
`;