import styled from "@emotion/styled";

export const UserName = styled.span`
    color: #2B65FC;
`;

export const Container = styled.div`
    & > div {
        margin-bottom: 16px;
    }
    
    & > div:nth-of-type(3) {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    & > div:nth-of-type(7) {
        margin-bottom: 32px;
    }
`;