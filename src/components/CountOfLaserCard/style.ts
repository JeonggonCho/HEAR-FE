import styled from "@emotion/styled";

export const Container = styled.div`
    width: 100%;
    padding: 18px;
    background-color: white;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid white;
    
    & > div {
        display: flex;
        align-items: center;
        gap: 10px;
        
        img {
            width: 24px;
        }
    }
    
    p {
        margin: 0;
        line-height: 1.5;
    }
    
    & > p:last-of-type {
        font-weight: bold;
        font-size: 18px;
        
        span {
            color: #2B65FC;
        }
    }
`;