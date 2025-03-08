import styled from "@emotion/styled";

export const Container = styled.div`
    & > div:first-of-type {
        background-color: ${({theme}) => theme.colors.bg.main} !important;
    }
    
    form {
        padding: 24px;
        background-color: ${({theme}) => theme.colors.bg.main};
        display: flex;
        flex-direction: column;
        gap: 32px;
    }
`;

export const ImageWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({theme}) => theme.colors.bg.sub};

    img {
        width: 120px;
        height: 120px;
        object-fit: cover;
        margin: 24px 0;
    }
`;