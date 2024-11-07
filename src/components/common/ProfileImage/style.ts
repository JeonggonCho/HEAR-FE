import styled from "@emotion/styled";

export const ProfileImageWrapper = styled.div<{size: number}>`
    width: ${({ size }) => size}px;
    height: ${({ size }) => size}px;
    border-radius: 50%;
    border: 1px solid ${({theme}) => theme.colors.line.main};
    overflow: hidden;
    background-color: ${({theme}) => theme.colors.bg.sub};
    
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    
    svg {
        width: 100%;
        height: 100%;
        fill: ${({theme}) => theme.colors.icon.fill};
        object-fit: cover;
    }
`;