import styled from "@emotion/styled";

export const HeaderWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    color: ${({theme}) => theme.colors.font.main};
    
    h2 {
        font-weight: 500;
    }
    
    img {
        width: 36px;
    }
`;

export const Container = styled.div`
    p {
        margin: 0 0 24px 6px;
        line-height: 1.5;
        color: ${({theme}) => theme.colors.font.main};
    }

    & > div:nth-of-type(2) {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }
`;