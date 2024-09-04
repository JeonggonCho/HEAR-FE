import styled from "@emotion/styled";

export const Container = styled.div`
    width: 100%;
    height: 70vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    & > p:first-of-type {
        text-align: center;
        margin-bottom: 36px;
        color: #999999;
    }
`;