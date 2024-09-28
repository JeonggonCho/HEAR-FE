import styled from "@emotion/styled";

export const Container = styled.div`
    form {
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
    margin-bottom: 24px;
    
    img {
        width: 120px;
        height: auto;
        object-fit: cover;
    }
`;