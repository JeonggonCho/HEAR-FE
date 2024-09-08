import styled from "@emotion/styled";

export const HeaderWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    
    img {
        width: 36px;
    }
`;

export const Container = styled.div`
    width: 100%;
    min-height: 100%;
    position: relative;

    p {
        color: ${({theme}) => theme.colors.font.main};
        line-height: 1.5;
        margin: 0 0 24px 6px;
    }
`;