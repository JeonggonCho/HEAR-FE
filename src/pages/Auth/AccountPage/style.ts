import styled from "@emotion/styled";

export const HeaderWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;

    h2 {
        font-weight: 500;
    }
    
    img {
        width: 36px;
    }
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