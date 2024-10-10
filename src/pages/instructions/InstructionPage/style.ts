import styled from "@emotion/styled";

export const HeaderWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    color: ${({theme}) => theme.colors.font.main};
    
    h2 {
        font-weight: 500;
        font-size: 1.25rem;
    }
    
    img {
        width: 36px;
    }
`;

export const Container = styled.div`
    p {
        width: 80%;
        margin: 0 0 24px 6px;
        line-height: 1.5;
        color: ${({theme}) => theme.colors.font.sub};
        text-wrap: wrap;
        word-break: manual;
        font-size: 0.9rem;
    }

    & > div:nth-of-type(2) {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }
`;