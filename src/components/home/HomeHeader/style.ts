import styled from "@emotion/styled";


export const LogoWrapper = styled.div`
    width: 36px;
    height: 36px;
`;

export const Logo = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export const Title = styled.h1`
    font-size: 1.5rem;
    font-weight: 500;
    color: ${({theme}) => theme.colors.font.primary};
`;