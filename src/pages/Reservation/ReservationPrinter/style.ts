import styled from "@emotion/styled";

export const Container = styled.div`
    & > div:first-of-type {
        background-color: ${({theme}) => theme.colors.bg.main} !important;
    }
    
    form {
        width: calc(100% + 48px);
        margin-left: -24px;
        padding: 24px;
        background-color: ${({theme}) => theme.colors.bg.main};
        display: flex;
        flex-direction: column;
        gap: 32px;
    }
`;

export const MapIcon = styled.div`
    width: 36px;
    height: 36px;
    overflow: hidden;
    cursor: pointer;
    
    &:hover {
        svg {
            fill: ${({theme}) => theme.colors.font.main};
        }
    }
    
    svg {
        width: 100%;
        height: 100%;
        object-fit: cover;
        fill: ${({theme}) => theme.colors.icon.fill};
        transition: all 0.2s ease-in-out 0s;
    }
`;

export const ImageWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    img {
        width: 120px;
        height: 120px;
        object-fit: cover;
        margin: 24px 0;

    }
`;