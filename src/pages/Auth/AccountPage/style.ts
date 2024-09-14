import styled from "@emotion/styled";

export const UserName = styled.span`
    color: ${({theme}) => theme.colors.font.primary};
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    
    & > div:nth-of-type(3) {
        display: flex;
        align-items: center;
        gap: 10px;
    }
`;