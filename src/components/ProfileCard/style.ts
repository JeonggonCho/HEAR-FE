import styled from "@emotion/styled";

export const Container = styled.div`
    width: 100%;
    border-radius: 16px;
    padding: 18px;
    background-color: white;
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 16px;
    border: 1px solid white;
    
    & > div {
        display: flex;
        align-items: center;
        gap: 20px;
        
        & > span:first-of-type {
            width: 80px;
            color: #999999;
        }
    }
`;