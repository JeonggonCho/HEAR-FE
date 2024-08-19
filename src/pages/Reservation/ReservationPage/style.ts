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
    p {
        margin-bottom: 16px;
    }

    & > div:nth-of-type(2) {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 16px;
    }
`;