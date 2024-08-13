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
    
    & > div {
        display: flex;
        align-items: center;
        gap: 20px;
        
        & > span:first-child {
            width: 80px;
            color: #999999;
        }
    }
`;