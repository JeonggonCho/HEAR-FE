import styled from "@emotion/styled";


export const Badge = styled.div`
    position: absolute;
    width: 20px;
    height: 20px;
    background-color: ${({theme}) => theme.colors.font.primary};
    border-radius: 50%;
    border: 3px solid ${({theme}) => theme.colors.bg.sub};
    right: -6px;
    top: -4px;
    z-index: 2;
`;