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

export const DateMachineSelectWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    
    & > label {
        color: ${({theme}) => theme.colors.font.main};
        margin-left: 4px;
    }
    
    & > span:first-of-type {
        color: ${({theme}) => theme.colors.font.sub};
        font-size: 0.85rem;
        margin-left: 4px;
    }
    
    & > div:first-of-type {
        width: 100%;
        border: 1px solid ${({theme}) => theme.colors.line.main};
        padding: 8px;
        border-radius: 12px;
    }
`;

export const EmptyMessage = styled.p`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: 40px;
    color: ${({theme}) => theme.colors.font.sub};
    font-size: 1rem;
`;